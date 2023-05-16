import React, { useEffect, useState } from 'react';
import services from '@services/api-services';
//utils
import { isEmpty, isArrayEmpty, dateToString } from '@utils';
//constants
import { outputDocumentState, dispatchFields } from '@constants';
import { toolbar, detailColumns, dispatchTypes, documentSearchFields } from '@constants/options';
//components
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { Dashboard } from '@components/dashboard';
import { DispatchForm } from '@components/dispatchform';
import { InputBarcodeReader } from '@components/inputbarcodereader';
//hooks
import { useSearch } from '@hooks/useSearch';
import { useSelection } from '@hooks/useSelection';
import { useForm, useDetail } from '@hooks/useFormState';
import { useNotification } from '@hooks/useNotification';
import { useControlField } from '@hooks/useControlField';
import { useSumarizeField } from '@hooks/useSumarizeField';

export const withDispatch = (props) => {
    const fields = { ...dispatchFields };
    const { initialState } = { ...props };
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
    } = useForm(initialState, outputDocumentState);

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
                if (isEmpty(document[fields.ID])) {
                    try {
                        const response = await services.postDispatchDocument(body);
                        updateDocumentFromService(response);
                        showNotification('success');
                    } catch (error) {
                        showNotification('error', error.message);
                    }
                } else {
                    try {
                        const response = await services.putDispatchDocument(body);
                        updateDocumentFromService(response);
                        const message = `El registro fue actualizado con exito`;
                        showNotification('success', message);
                    } catch (error) {
                        showNotification('error', error.message);
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
            if (!isEmpty(document[fields.ID])) {
                const response = await services.findDispatchDocumentById(
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
                await services.deleteDispatchDocument(document);
                onNewDocument();
                const message = `El registro fue eliminado con exito`;
                showNotification('success', message);
            } catch (error) {
                showNotification('error', error.message);
            }
        };

        return {
            state: deleteButtonStatusDisabled(),
            command: onDeleteDocument,
        };
    };

    const onRelease = async () => {
        if (releaseValidations()) {
            try {
                const response = await services.releaseDispatchDocument(dateToString(document));
                updateDocumentFromService(response);
                const message = `El registro fue liberado con exito`;
                showNotification('success', message);
            } catch (error) {
                showNotification('error', error.message);
            }

            clearControlAmountField();
            clearControlQuantityField();
        }
    };

    const actions = () => {
        const release = {
            label: 'Liberar',
            command: onRelease,
            disabled: releaseButtonStatusDisabled(),
        };

        return [release];
    };

    const updateDetails = (detail) => {
        if (detail[fields.LINE_NUMBER] == 0) {
            addDetail([...document[fields.DETAILS]], { ...detail });
        } else {
            const rows = updateRows([...document[fields.DETAILS]], { ...detail });
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
        const validateWarehouseField = validateField(
            document[fields.WAREHOUSE],
            'Almacen',
            showNotification
        );
        const validateDescriptionField = validateField(
            document[fields.DESCRIPTION],
            'Descripcion',
            showNotification
        );

        return validateWarehouseField && validateDescriptionField;
    };

    const releaseValidations = () => {
        const validateSaveFields = saveValidations();
        const validateIdField = !releaseButtonStatusDisabled();
        const validateAmountField = validateControlAmountField('Control Monto Total');
        const validateQuantityField = validateControlQuantityField('Control Cantidad Total');
        return (
            validateIdField && validateSaveFields && validateAmountField && validateQuantityField
        );
    };

    //props
    const dispatchProps = {
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
            documentTypes: dispatchTypes,
        },
    };

    const detailProps = {
        fields,
        selection,
        removeDetail,
        updateDetails,
        updateSelection,
        columns: detailColumns,
        data: document[fields.DETAILS],
        editable: addButtonStatusDisabled(),
    };

    const searchProps = {
        selectOption,
        visible: search,
        onHide: hideSearch,
        type: document[fields.TYPE],
        fields: documentSearchFields,
        getDataByPage: services.findAllDispatchDocumentByPage,
        getDataAsPage: services.findAllDispatchDocumentAsPage,
    };

    const barcodeProps = {
        showNotification,
        processBarcode: updateDetails,
        documentType: document[fields.TYPE],
        disabled: isEmpty(document[fields.WAREHOUSE]),
        warehouse: document[fields.WAREHOUSE][fields.ID],
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
                <DispatchForm {...dispatchProps} />
                <InputBarcodeReader {...barcodeProps} />
                <Details {...detailProps} />
                {search ? <Search {...searchProps} /> : <></>}
                <Toast ref={notification} />
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

const validateField = (value, fieldName, showNotification) => {
    const validate = isEmpty(value) || !value;
    if (validate) {
        const message = `El campo ${fieldName} esta vacio`;
        showNotification('error', message);
    }

    return !validate;
};
