import React, { useEffect, useState } from 'react';
import services from '@services/api-services';
//utils
import { MESSAGES } from '@messages';
import { dateToString, isNullOrUndefinedOrEmptyString } from '@utils';
import { MESSAGE_TYPES, receptionFields, inputDocumentState } from '@constants';
import {
    isReleased,
    validateRepeatedItem,
    validateNotEmptyStringField,
    validateNotEmptyObjectField,
} from '@utils/validations';
import { toolbar, detailColumns, receptionTypes, documentSearchFields } from '@constants/options';
//components
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { Viewer } from '@components/reportviewer';
import { Dashboard } from '@components/dashboard';
import { BarcodeSheet } from '@components/barcodesheet';
import { ReceptionForm } from '@components/receptionform';
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

export const Reception = (props) => {
    const fields = { ...receptionFields };
    const { initialState } = { ...props };
    const [showSheet, setShowSheet] = useState(false);
    const [customSheet, setCustomSheet] = useState([]);
    const [showViewer, setShowViewer] = useState(false);
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
    } = useDocumentForm({ initialState, defaultInitialState: inputDocumentState });

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
                        ? await services.postReceptionDocument(body)
                        : await services.putReceptionDocument(body);

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
                const response = await services.findReceptionDocumentById(
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
                await services.deleteReceptionDocument(document);
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
                header: 'Eliminar Documento',
                acceptClassName: 'p-button-danger',
                icon: 'pi pi-exclamation-triangle',
                message: `¿Esta seguro que desea borrar el documento?`,
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
                    const response = await services.releaseReceptionDocument(
                        dateToString(document)
                    );
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

    const onHideSheet = () => {
        setShowSheet(false);
    };

    const onCustomSheet = (positions) => {
        setCustomSheet(positions);
    };

    const onHideViewer = () => {
        setShowViewer(false);
    };

    const actions = () => {
        const release = {
            label: 'Liberar',
            command: onRelease().command,
            disabled: releaseButtonDisabled || rowsEdited,
        };

        const sheet = {
            label: 'Personalizar etiquetas',
            command: () => {
                setShowSheet(true);
            },
            disabled: !isReleased(document.status),
        };

        const viewer = {
            label: 'Imprimir Etiquetas',
            command: () => {
                setShowViewer(true);
            },
            disabled: !isReleased(document.status),
        };

        return [release, sheet, viewer];
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
        const response = await services.findAllReceptionDocumentByPage(document.type, page);

        return response;
    };

    const getDataAsPage = async () => {
        const response = await services.findAllReceptionDocumentAsPage(document.type);

        return response;
    };

    const receptionToolbar = () => {
        const documentToolbar = createDocumentToolbar(
            onNewDocument,
            onSave(),
            onCancel(),
            onDelete(),
            actions()
        );
        return <Menubar model={documentToolbar} />;
    };

    //props
    const receptionProps = {
        fields,
        document,
        showSearch,
        totalAmount,
        totalQuantity,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        isReleased: isReleased(document.status),
        updateControlAmountField,
        updateControlQuantityField,
        options: {
            documentTypes: receptionTypes,
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

    const barcodeSheetProps = {
        visible: showSheet,
        onHide: onHideSheet,
        onYes: onCustomSheet,
        quantity: document[fields.TOTAL_QUANTITY],
    };

    const viewerProps = {
        document,
        body: customSheet,
        visible: showViewer,
        onHide: onHideViewer,
    };

    useEffect(() => {
        if (updateInitialDocument(document.type)) {
            clearDetails();
        }
    }, [document.type]);

    return (
        <Dashboard>
            <Panel header={receptionToolbar}>
                <ReceptionForm {...receptionProps} />
                <Details {...detailProps} />
                {search && <Search {...searchProps} />}
                <ConfirmDialog />
                <Toast ref={notification} />
                <Viewer {...viewerProps} />
                <BarcodeSheet {...barcodeSheetProps} />
            </Panel>
        </Dashboard>
    );
};
