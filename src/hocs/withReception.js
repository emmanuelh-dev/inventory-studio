import React, { useEffect } from 'react';
//utils
import { isEmpty, buildUrl, dateToString, stringToDate } from '@utils';
//constants
import { receptionState, receptionFields } from '@constants';
import { toolbar, receptionTypes, detailColumns, documentSearchFields } from '@constants/options';
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

export const withReception = (props) => {
    //states
    const {
        state: document,
        updateField: updateDocumentField,
        updateState: updateDocument,
    } = useFormState({}, { ...receptionState });

    const { state: details, updateState: updateDetails } = useFormState({}, { content: [] });
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
    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateDocument);

    const onSaveDocument = () => {
        document[fields.DETAILS] = details.content;
        if (isEmpty(document[fields.ID])) {
            usePost(`${endpoint.save}${document[fields.TYPE]}`, dateToString({ ...document })).then(
                (data) => {
                    fetchDetails(data);
                    updateDocument(stringToDate(data));
                    updateCopy(stringToDate(data));
                    showNotification('success');
                }
            );
        }
    };

    const fetchDetails = (_document, page = null) => {
        const params = {
            type: _document[fields.TYPE],
            id: _document[fields.ID],
        };
        useGet(`${buildUrl(endpoint.details, params)}?page=${page || 0}&size=10`).then((data) => {
            updateDetails(data);
        });
    };

    //props
    const receptionProps = {
        fields,
        document,
        showSearch,
        updateDocumentField,
        options: {
            documentTypes: receptionTypes,
        },
    };

    const detailProps = {
        fields,
        data: details,
        updateDetails,
        columns: detailColumns,
    };

    const searchProps = {
        fields: documentSearchFields,
        endpoint,
        selectOption,
        visible: search,
        detailToolbar: [],
        onHide: hideSearch,
    };

    //hooks
    useEffect(() => {
        endpoint.suggestions = `${process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS}${
            document[fields.TYPE]
        }`;
    }, [document[fields.TYPE]]);

    const toolbar = () => {
        const documentToolbar = createToolbar(onNew, onSaveDocument, null, null);
        return <Menubar model={documentToolbar} />;
    };

    return (
        <Panel header={toolbar}>
            <ReceptionForm {...receptionProps} />
            <Details {...detailProps} />
            <Search {...searchProps} />
            <Toast ref={notification} />
        </Panel>
    );
};

const createToolbar = (onNew, onSave, onDelete, actions) => {
    const documentToolbar = [...toolbar];
    documentToolbar[0].command = onNew;
    documentToolbar[1].command = onSave;

    return documentToolbar;
};
