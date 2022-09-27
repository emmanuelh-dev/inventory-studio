import React, { useEffect } from 'react';
//utils
import { isEmpty, dateToString, stringToDate } from '@utils';
//constants
import { receptionState, receptionFields, detailState } from '@constants';
import {
    toolbar,
    detailColumns,
    detailsToolbar,
    receptionTypes,
    documentSearchFields,
} from '@constants/options';
//components

import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { ReceptionForm } from '@components/receptionform';
//hooks

import { useNew } from '@hooks/useNew';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useCopy } from '@hooks/useCopy';
import { useSearch } from '@hooks/useSearch';
import { useFormState } from '@hooks/useFormState';
import { useNotification } from '@hooks/useNotification';
import { useControlField } from '@hooks/useControlField';
import { useSumarizeField } from '@hooks/useSumarizeField';

export const withReception = (props) => {
    //states
    const {
        state: document,
        updateState: updateDocument,
        updateField: updateDocumentField,
    } = useFormState({}, { ...receptionState });

    const { state: selection, updateState: updateSelection } = useFormState([], []);

    const { buttonState, updateCopy, updateSaveButton } = useCopy({ ...receptionState }, document);
    const { onNew } = useNew(updateDocument, updateCopy, { ...receptionState });

    //constants
    const fields = { ...receptionFields };
    const endpoint = {
        save: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        update: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        suggestions: `${process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS}${document[fields.TYPE]}`,
    };

    //actions
    useSumarizeField(document, updateDocument, fields);
    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateDocument, updateCopy);

    const {
        controlField: controlQuantityField,
        validate: validateControlQuantityField,
        cleanControlField: cleanControlQuantityField,
        updateControlField: updateControlQuantityField,
    } = useControlField(document[fields.TOTAL_QUANTITY], showNotification, 0);

    const {
        controlField: controlAmountField,
        validate: validateControlAmountField,
        cleanControlField: cleanControlAmountField,
        updateControlField: updateControlAmountField,
    } = useControlField(document[fields.TOTAL_AMOUNT], showNotification, 0);

    const onNewDocument = () => {
        const _initialState = { ...receptionState };
        _initialState[fields.TYPE] = document[fields.TYPE];
        onNew(_initialState);
        updateSelection([]);
        cleanControlAmountField();
        cleanControlQuantityField();
    };

    const onSave = () => {
        const onSaveDocument = () => {
            const validation = saveValidations();

            if (validation) {
                if (isEmpty(document[fields.ID])) {
                    usePost(
                        `${endpoint.save}${document[fields.TYPE]}`,
                        dateToString(document)
                    ).then((data) => {
                        const _document = stringToDate(data);
                        updateDocument(_document);
                        updateCopy(_document);
                        showNotification('success');
                    });
                } else {
                    usePut(
                        `${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}`,
                        dateToString(document)
                    ).then((data) => {
                        const _document = stringToDate(data);
                        updateDocument(_document);
                        updateCopy(_document);
                        const message = `El registro fue actualizado con exito`;
                        showNotification('success', message);
                    });
                }
            }
        };

        return {
            state: buttonState,
            command: onSaveDocument,
        };
    };

    const onCancel = () => {
        const onCancelDocument = () => {
            if (!isEmpty(document[fields.ID])) {
                useGet(`${endpoint.suggestions}/id/${document[fields.ID]}`).then((data) => {
                    const _document = stringToDate(data);
                    updateDocument(_document);
                    updateCopy(_document);
                });
            } else {
                onNewDocument();
            }
        };

        return {
            state: buttonState,
            command: onCancelDocument,
        };
    };

    const onDelete = () => {
        return {
            state: isEmpty(document[fields.ID]) || document[fields.STATUS] !== 'RELEASED',
            command: () => {},
        };
    };

    const onAddDetail = () => {
        const _document = { ...document };
        _document[fields.COUNTER] = _document[fields.COUNTER] + 1;
        const _details = [...document[fields.DETAILS]];
        const _initialState = { ...detailState };
        _initialState[fields.LINE_NUMBER] = _document[fields.COUNTER];
        _details.unshift(_initialState);
        _document[fields.DETAILS] = _details;
        updateDocument(_document);
    };

    const onRemove = () => {
        const onRemoveDetail = () => {
            const _document = { ...document };
            const _details = [...document[fields.DETAILS]];

            const __details = _details.reduce((accumulator, element) => {
                const removed = selection.find((value) => {
                    return value[fields.LINE_NUMBER] === element[fields.LINE_NUMBER];
                });

                if (removed == undefined) {
                    accumulator.unshift(element);
                } else if (removed !== undefined && removed[fields.ID]) {
                    element[fields.DELETED] = true;

                    accumulator.unshift(element);
                }

                return accumulator;
            }, []);

            _document[fields.DETAILS] = __details;
            updateDocument(_document);
        };

        return {
            state: isEmpty(document[fields.DETAILS]),
            command: onRemoveDetail,
        };
    };

    //validations
    const saveValidations = () => {
        const validateAmountField = validateControlAmountField('Control Monto Total');
        const validateQuantityField = validateControlQuantityField('Control Cantidad Total');
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

        return (
            validateAmountField &&
            validateQuantityField &&
            validateWarehouseField &&
            validateDescriptionField
        );
    };

    //props
    const receptionProps = {
        fields,
        document,
        showSearch,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        updateControlAmountField,
        updateControlQuantityField,
        options: {
            documentTypes: receptionTypes,
        },
    };
    const detailProps = {
        fields,
        selection,
        updateSelection,
        updateDocumentField,
        columns: detailColumns,
        data: document[fields.DETAILS],
        detailToolbar: createDetailToolbar(onAddDetail, onRemove()),
    };

    const searchProps = {
        endpoint,
        selectOption,
        visible: search,
        onHide: hideSearch,
        fields: documentSearchFields,
    };

    //hooks
    useEffect(() => {
        endpoint.suggestions = `${endpoint.suggestions}${document[fields.TYPE]}`;
        onNewDocument();
    }, [document[fields.TYPE]]);

    useEffect(() => {
        updateSaveButton();
    }, [document]);

    useEffect(() => {
        cleanControlAmountField();
        cleanControlQuantityField();
    }, [document[fields.ID]]);

    const documentToolbar = () => {
        const _documentToolbar = createDocumentToolbar(
            onNewDocument,
            onSave(),
            onCancel(),
            onDelete(),
            null
        );
        return <Menubar model={_documentToolbar} />;
    };

    return (
        <Panel header={documentToolbar}>
            <ReceptionForm {...receptionProps} />
            <Details {...detailProps} />
            {search ? <Search {...searchProps} /> : <></>}
            <Toast ref={notification} />
        </Panel>
    );
};

const createDocumentToolbar = (onNew, onSave, onCancel, onDelete, actions) => {
    const documentToolbar = [...toolbar];
    documentToolbar[0].command = onNew;
    documentToolbar[1].command = onSave.command;
    documentToolbar[1].disabled = onSave.state;
    documentToolbar[2].command = onCancel.command;
    documentToolbar[2].disabled = onCancel.state;
    documentToolbar[3].command = onCancel.command;
    documentToolbar[3].disabled = onCancel.state;

    return documentToolbar;
};

const createDetailToolbar = (onAdd, onRemove) => {
    const _detailsToolbar = [...detailsToolbar];
    _detailsToolbar[0].command = onAdd;
    _detailsToolbar[1].command = onRemove.command;
    _detailsToolbar[1].disabled = onRemove.state;
    return _detailsToolbar;
};

const validateField = (value, fieldName, showNotification) => {
    const validate = isEmpty(value) || !value;
    if (validate) {
        const message = `El campo ${fieldName} esta vacio`;
        showNotification('error', message);
    }

    return !validate;
};
