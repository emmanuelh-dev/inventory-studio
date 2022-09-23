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
import { ReceptionForm } from '@components/reception';
//hooks

import { useNew } from '@hooks/useNew';
import { useGet } from '@hooks/useGet';
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

    const { buttonState, updateCopy, updateSaveButton } = useCopy({ ...receptionState }, document);
    const { onNew } = useNew(updateDocument, updateCopy, { ...receptionState });

    //constants
    const fields = { ...receptionFields };
    const endpoint = {
        save: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        update: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        details: process.env.NEXT_PUBLIC_RECEPTIONS_DETAILS,
        suggestions: `${process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS}${document[fields.TYPE]}`,
    };

    //actions
    useSumarizeField(document, updateDocument, fields);

    const {
        controlField: controlQuantityField,
        validate: validateControlQuantityField,
        updateControlField: updateControlQuantityField,
    } = useControlField(document[fields.TOTAL_QUANTITY], 0);

    const {
        controlField: controlAmountField,
        validate: validateControlAmountField,
        updateControlField: updateControlAmountField,
    } = useControlField(document[fields.TOTAL_AMOUNT], 0);

    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateDocument, updateCopy);

    const onSaveDocument = () => {
        if (isEmpty(document[fields.ID])) {
            usePost(`${endpoint.save}${document[fields.TYPE]}`, dateToString(document)).then(
                (data) => {
                    const _document = stringToDate(data);
                    updateDocument(_document);
                    updateCopy(_document);
                    showNotification('success');
                }
            );
        }
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
        data: document[fields.DETAILS],
        updateDocumentField,
        columns: detailColumns,
        detailToolbar: createDetailToolbar(onAddDetail, null),
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
    }, [document[fields.TYPE]]);

    const documentToolbar = () => {
        const _documentToolbar = createDocumentToolbar(onNew, onSaveDocument, null, null);
        return <Menubar model={_documentToolbar} />;
    };

    return (
        <Panel header={documentToolbar}>
            <ReceptionForm {...receptionProps} />
            <Details {...detailProps} />
            <Search {...searchProps} />
            <Toast ref={notification} />
        </Panel>
    );
};

const createDocumentToolbar = (onNew, onSave, onDelete, actions) => {
    const documentToolbar = [...toolbar];
    documentToolbar[0].command = onNew;
    documentToolbar[1].command = onSave;

    return documentToolbar;
};

const createDetailToolbar = (onAdd, onRemove) => {
    const _detailsToolbar = [...detailsToolbar];
    _detailsToolbar[0].command = onAdd;
    return _detailsToolbar;
};
