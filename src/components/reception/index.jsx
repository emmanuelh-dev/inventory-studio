import React, { useEffect, useState } from 'react';
import services from '@services/api-services';
//utils
import { MESSAGES } from '@messages';
import { MESSAGE_TYPES, receptionFields, inputDocumentState } from '@constants';
import { isObjectEmpty, isArrayEmpty, dateToString } from '@utils';
import { validateNotEmptyField, validateRepeatedItem } from '@utils/validations';
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
import { useSumarizeField } from '@hooks/useSumarizeField';
import { useDocumentForm, useDetail } from '@hooks/useFormState';

export const Reception = (props) => {
    const fields = { ...receptionFields };
    const [showSheet, setShowSheet] = useState(false);
    const [customSheet, setCustomSheet] = useState([]);
    const [showViewer, setShowViewer] = useState(false);

    const { initialState } = { ...props };
    //states
    const {
        document,
        isReleased,
        clearDocument,
        updateDocument,
        updateDocumentCopy,
        saveButtonDisabled,
        updateDocumentField,
        updateInitialDocument,
        updateSaveButtonStatus,
        addButtonStatusDisabled,
        updateDocumentFromService,
        deleteButtonStatusDisabled,
        releaseButtonStatusDisabled,
    } = useDocumentForm(initialState, inputDocumentState);
    const { createRow, removeRows, updateRows } = useDetail();
    const { selection, clearSelection, updateSelection } = useSelection();

    //actions
    useSumarizeField(document, updateDocument, fields);
    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(
        updateDocument,
        updateDocumentCopy
    );

    const {
        controlField: controlQuantityField,
        validate: validateControlQuantityField,
        clearControlField: clearControlQuantityField,
        updateControlField: updateControlQuantityField,
    } = useControlField(document[fields.TOTAL_QUANTITY], showNotification, 0);

    const {
        controlField: controlAmountField,
        validate: validateControlAmountField,
        clearControlField: clearControlAmountField,
        updateControlField: updateControlAmountField,
    } = useControlField(document[fields.TOTAL_AMOUNT], showNotification, 0);

    const onNewDocument = () => {
        clearDocument();
        clearSelection();
        clearControlAmountField();
        clearControlQuantityField();
    };

    const onSave = () => {
        const onSaveDocument = async () => {
            const validation = saveValidations();

            if (validation) {
                const body = dateToString(document);
                if (isObjectEmpty(document[fields.ID])) {
                    try {
                        const response = await services.postReceptionDocument(body);
                        updateDocumentFromService(response);
                        showNotification(MESSAGE_TYPES.SUCCESS);
                    } catch (error) {
                        showNotification(MESSAGE_TYPES.ERROR, error.message);
                    }
                } else {
                    try {
                        const response = await services.putReceptionDocument(body);
                        updateDocumentFromService(response);
                        showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCCESS_RECORD_UPDATED);
                    } catch (error) {
                        showNotification(MESSAGE_TYPES.ERROR, error.message);
                    }
                }
            }
        };

        return {
            state: saveButtonDisabled,
            command: onSaveDocument,
        };
    };

    const onCancel = () => {
        const onCancelDocument = async () => {
            if (!isObjectEmpty(document[fields.ID])) {
                const response = await services.findReceptionDocumentById(
                    document[fields.TYPE],
                    document[fields.ID]
                );
                updateDocumentFromService(response);
            } else {
                onNewDocument();
            }
        };

        return {
            state: saveButtonDisabled,
            command: onCancelDocument,
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
            state: deleteButtonStatusDisabled(),
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
            disabled: releaseButtonStatusDisabled(),
        };

        const sheet = {
            label: 'Personalizar etiquetas',
            command: () => {
                setShowSheet(true);
            },
            disabled: document[fields.STATUS] != 'RELEASED',
        };

        const viewer = {
            label: 'Imprimir Etiquetas',
            command: () => {
                setShowViewer(true);
            },
            disabled: document[fields.STATUS] != 'RELEASED',
        };

        return [release, sheet, viewer];
    };

    const updateDetails = (detail) => {
        const details = [...document[fields.DETAILS]];
        if (validateRepeatedItem(detail, details, showNotification)) return;
        if (detail[fields.LINE_NUMBER] == 0) {
            addDetail(details, detail);
        } else {
            const rows = updateRows(details, detail);
            !isArrayEmpty(rows) && updateDocumentField(fields.DETAILS, rows);
        }
    };

    const addDetail = (details, detail) => {
        const nextCounter = document[fields.COUNTER] + 1;
        const row = createRow(detail, nextCounter);
        details.unshift(row);
        updateDocumentField(fields.COUNTER, nextCounter);
        updateDocumentField(fields.DETAILS, details);
    };

    const removeDetail = () => {
        const details = removeRows([...document[fields.DETAILS]], selection);
        updateDocumentField(fields.DETAILS, details);
    };

    //validations
    const saveValidations = () => {
        const validateWarehouseField = validateNotEmptyField(
            document[fields.WAREHOUSE],
            'Almacen',
            showNotification
        );
        const validateDescriptionField = validateNotEmptyField(
            document[fields.DESCRIPTION],
            'Descripcion',
            showNotification
        );

        return validateWarehouseField && validateDescriptionField;
    };

    const releaseValidations = () => {
        const validateSaveFields = saveValidations();
        const validateIdField = !releaseButtonStatusDisabled();
        const validateAmountField = validateControlAmountField(MESSAGES.CONTROL_TOTAL_AMOUNT);
        const validateQuantityField = validateControlQuantityField(MESSAGES.CONTROL_TOTAL_QUANTITY);
        return (
            validateIdField && validateSaveFields && validateAmountField && validateQuantityField
        );
    };

    const getDataByPage = async (page) => {
        const response = await services.findAllReceptionDocumentByPage(document[fields.TYPE], page);

        return response;
    };

    const getDataAsPage = async () => {
        const response = await services.findAllReceptionDocumentAsPage(document[fields.TYPE]);

        return response;
    };

    //props
    const receptionProps = {
        fields,
        document,
        showSearch,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        isReleased: isReleased(),
        updateControlAmountField,
        updateControlQuantityField,
        options: {
            documentTypes: receptionTypes,
        },
    };

    const detailProps = {
        fields,
        selection,
        removeDetail,
        updateDetails,
        updateSelection,
        columns: detailColumns,
        type: document[fields.TYPE],
        data: document[fields.DETAILS],
        editable: addButtonStatusDisabled(),
        warehouse: document[fields.WAREHOUSE],
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

    //hooks
    useEffect(() => {
        updateInitialDocument(document[fields.TYPE]);
    }, [document[fields.TYPE]]);

    useEffect(() => {
        updateSaveButtonStatus();
    }, [document]);

    useEffect(() => {
        clearControlAmountField();
        clearControlQuantityField();
    }, [document[fields.ID]]);

    const documentToolbar = () => {
        const _documentToolbar = createDocumentToolbar(
            onNewDocument,
            onSave(),
            onCancel(),
            onDelete(),
            actions()
        );
        return <Menubar model={_documentToolbar} />;
    };

    return (
        <Dashboard>
            <Panel header={documentToolbar}>
                <ReceptionForm {...receptionProps} />
                <Details {...detailProps} />
                {search ? <Search {...searchProps} /> : <></>}
                <Toast ref={notification} />
                <BarcodeSheet {...barcodeSheetProps} />
                <Viewer {...viewerProps} />
                <ConfirmDialog />
            </Panel>
        </Dashboard>
    );
};

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