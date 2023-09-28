import _ from 'lodash';
import React, { useEffect } from 'react';
import services from '@services/api-services';
//utils
import { MESSAGES } from '@messages';
import { MESSAGE_TYPES, dispatchFields, outputDocumentState } from '@constants';
import {
    isReleased,
    validateRepeatedItem,
    validateNotEmptyStringField,
    validateNotEmptyObjectField,
} from '@utils/validations';
import { isObjectEmpty, dateToString, isNullOrUndefinedOrEmptyString } from '@utils';
import { toolbar, detailColumns, dispatchTypes, documentSearchFields } from '@constants/options';
//components
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { Dashboard } from '@components/dashboard';
import { DispatchForm } from '@components/dispatchform';
import { InputBarcodeReader } from '@components/inputbarcodereader';
//hooks
import { useSearch } from '@hooks/useSearch';
import { useSelection } from '@hooks/useSelection';
import { useNotification } from '@hooks/useNotification';
import { useControlField } from '@hooks/useControlField';
import { useDocumentForm, useDetail } from '@hooks/useFormState';

const createDocumentToolbar = (onNew, onSave, onCancel, onDelete, actions) => {
    const documentToolbar = [...toolbar];
    documentToolbar[0].command = onNew;
    documentToolbar[1].command = onSave.command;
    documentToolbar[1].disabled = onSave.state;
    documentToolbar[2].command = onCancel.command;
    documentToolbar[2].disabled = onCancel.state;
    documentToolbar[3].command = onDelete.command;
    documentToolbar[3].disabled = onDelete.state;
    documentToolbar[4].items = actions;

    return documentToolbar;
};

export const Dispatch = (props) => {
    const fields = { ...dispatchFields };
    const { initialState } = { ...props };
    //states
    const {
        document,
        clearDocument,
        updateDocument,
        documentEdited,
        addButtonDisabled,
        updateDocumentCopy,
        updateDocumentField,
        deleteButtonDisabled,
        releaseButtonDisabled,
        updateInitialDocument,
        updateDocumentFromService,
    } = useDocumentForm({ initialState, defaultInitialState: outputDocumentState });

    const {
        rows,
        addDetail,
        rowsEdited,
        lineCounter,
        totalAmount,
        createDetail,
        clearDetails,
        totalQuantity,
        removeDetails,
        updateDetails,
        readDetailFromBarcode,
        updateDetailFromService,
    } = useDetail({
        initialDetails: document.details,
        initialCounter: document.counter,
        initialAmount: document.totalAmount,
        initialQuantity: document.totalQuantity,
    });

    const { notification, showNotification } = useNotification();
    const { selection, clearSelection, updateSelection } = useSelection();
    const { search, showSearch, hideSearch, selectOption } = useSearch((data) => {
        updateDocument(data);
        const { details, counter, totalAmount, totalQuantity } = { ...data };
        updateDetailFromService(details, counter, totalAmount, totalQuantity);
        clearControlAmountField();
        clearControlQuantityField();
    }, updateDocumentCopy);

    const {
        controlField: controlQuantityField,
        validate: validateControlQuantityField,
        clearControlField: clearControlQuantityField,
        updateControlField: updateControlQuantityField,
    } = useControlField(document.totalQuantity, showNotification);

    const {
        controlField: controlAmountField,
        validate: validateControlAmountField,
        clearControlField: clearControlAmountField,
        updateControlField: updateControlAmountField,
    } = useControlField(document.totalAmount, showNotification);

    const onNewDocument = () => {
        clearDocument();
        clearDetails();
        clearSelection();
        clearControlAmountField();
        clearControlQuantityField();
    };

    const onSave = () => {
        const onSaveDocument = async () => {
            const validation = saveValidations();

            if (validation) {
                const body = dateToString(document);
                body.details = rows;
                body.counter = lineCounter;
                body.totalAmount = totalAmount;
                body.totalQuantity = totalQuantity;
                try {
                    const isNewDocument = isNullOrUndefinedOrEmptyString(document.id);
                    const response = isNewDocument
                        ? await services.postDispatchDocument(body)
                        : await services.putDispatchDocument(body);

                    updateDocumentFromService(response);
                    const { details, counter, totalAmount, totalQuantity } = { ...response };
                    updateDetailFromService(details, counter, totalAmount, totalQuantity);
                    isNewDocument
                        ? showNotification(MESSAGE_TYPES.SUCCESS)
                        : showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCCESS_RECORD_UPDATED);
                } catch (error) {
                    showNotification(MESSAGE_TYPES.ERROR, error.message);
                }
            }
        };

        return {
            command: onSaveDocument,
            state: !(documentEdited || rowsEdited),
        };
    };

    const onCancel = () => {
        const onCancelDocument = async () => {
            if (!isNullOrUndefinedOrEmptyString(document.id)) {
                const response = await services.findDispatchDocumentById(
                    document.type,
                    document.id
                );
                updateDocumentFromService(response);
                const { details, counter, totalAmount, totalQuantity } = { ...response };
                updateDetailFromService(details, counter, totalAmount, totalQuantity);
            } else {
                onNewDocument();
            }
        };

        return {
            command: onCancelDocument,
            state: !(documentEdited || rowsEdited),
        };
    };

    const onDelete = () => {
        const onDeleteDocument = async () => {
            try {
                await services.deleteDispatchDocument(document);
                onNewDocument();
                showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
            } catch (error) {
                showNotification(MESSAGE_TYPES.ERROR, error.message);
            }
        };

        const onConfirm = () => {
            confirmDialog({
                reject: () => {},
                accept: onDeleteDocument,
                acceptClassName: 'p-button-danger',
                icon: 'pi pi-exclamation-triangle',
                message: `¿Esta seguro que desea borrar el documento?`,
                header: `${MESSAGES.DOCUMENT_DELETE_CONFIRMATION} ${document.id}`,
            });
        };

        return {
            state: deleteButtonDisabled,
            command: onConfirm,
        };
    };

    const onRelease = () => {
        const onReleaseDocument = async () => {
            if (releaseValidations()) {
                try {
                    const response = await services.releaseDispatchDocument(dateToString(document));
                    updateDocumentFromService(response);
                    showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_RELEASED);
                } catch (error) {
                    showNotification(MESSAGE_TYPES.ERROR, error.message);
                }

                clearControlAmountField();
                clearControlQuantityField();
            }
        };

        const onConfirm = () => {
            confirmDialog({
                reject: () => {},
                accept: onReleaseDocument,
                header: 'Liberar Documento',
                acceptClassName: 'p-button-warning',
                icon: 'pi pi-exclamation-triangle',
                message: `Despues de liberar el documento no sera posible editarlo`,
            });
        };

        return {
            command: onConfirm,
        };
    };

    const actions = () => {
        const release = {
            label: 'Liberar',
            command: onRelease().command,
            disabled: releaseButtonDisabled || rowsEdited,
        };

        return [release];
    };

    const saveValidations = () => {
        const validateWarehouseField = validateNotEmptyObjectField(
            document[fields.WAREHOUSE],
            'Almacen',
            showNotification
        );
        const validateDescriptionField = validateNotEmptyStringField(
            document[fields.DESCRIPTION],
            'Descripcion',
            showNotification
        );

        return validateWarehouseField && validateDescriptionField;
    };

    const releaseValidations = () => {
        const validateSaveFields = saveValidations();
        const validateIdField = !releaseButtonDisabled;
        const validateAmountField = validateControlAmountField(MESSAGES.CONTROL_TOTAL_AMOUNT);
        const validateQuantityField = validateControlQuantityField(MESSAGES.CONTROL_TOTAL_QUANTITY);
        return (
            validateIdField && validateSaveFields && validateAmountField && validateQuantityField
        );
    };

    const updateDetailTable = (detail) => {
        if (validateRepeatedItem(detail, rows, showNotification)) return;
        if (detail.lineNumber == 0) {
            const newDetail = createDetail(detail);
            addDetail(newDetail);
        } else {
            updateDetails(detail);
        }
    };

    const removeDetail = () => {
        removeDetails(selection);
    };

    const getDataByPage = async (page) => {
        const response = await services.findAllDispatchDocumentByPage(document.type, page);

        return response;
    };

    const getDataAsPage = async () => {
        const response = await services.findAllDispatchDocumentAsPage(document.type);

        return response;
    };

    const onBarcodeReading = async (barcode) => {
        try {
            const warehouseId = document.warehouse.id;
            const response = await services.findDispatchDetailReadingBarcode(warehouseId, barcode);
            readDetailFromBarcode(response);
        } catch (error) {
            showNotification(MESSAGE_TYPES.ERROR, error.message);
        }
    };

    const dispatchToolbar = () => {
        const documentToolbar = createDocumentToolbar(
            onNewDocument,
            onSave(),
            onCancel(),
            onDelete(),
            actions()
        );
        return <Menubar model={documentToolbar} />;
    };

    const dispatchProps = {
        fields,
        document,
        showSearch,
        totalAmount,
        totalQuantity,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        updateControlAmountField,
        updateControlQuantityField,
        isReleased: isReleased(document.status),
        options: {
            documentTypes: dispatchTypes,
        },
    };

    const detailProps = {
        fields,
        selection,
        data: rows,
        removeDetail,
        updateSelection,
        updateDetailTable,
        type: document.type,
        columns: detailColumns,
        editable: addButtonDisabled,
        warehouse: document.warehouse,
    };

    const searchProps = {
        selectOption,
        visible: search,
        onHide: hideSearch,
        fields: documentSearchFields,
        getDataByPage: getDataByPage,
        getDataAsPage: getDataAsPage,
    };

    const barcodeProps = {
        processBarcode: onBarcodeReading,
        disabled: isObjectEmpty(document.warehouse) || isReleased(document.status),
    };

    useEffect(() => {
        if (updateInitialDocument(document.type)) {
            clearDetails();
        }
    }, [document.type]);

    return (
        <Dashboard>
            <Panel headerTemplate={dispatchToolbar}>
                <DispatchForm {...dispatchProps} />
                <InputBarcodeReader {...barcodeProps} />
                <Details {...detailProps} />
                {search ? <Search {...searchProps} /> : <></>}
                <ConfirmDialog />
                <Toast ref={notification} />
            </Panel>
        </Dashboard>
    );
};
