import React, { useEffect } from 'react';
import { receptionState, receptionFields } from '@constants';
import { receptionTypes, detailColumns, documentSearchFields } from '@constants/options';
//components
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { ReceptionForm } from '@components/reception';
//hooks
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

    //actions
    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateDocument);

    //endpoint
    const fields = { ...receptionFields };
    const endpoint = {
        save: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        update: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        details: process.env.NEXT_PUBLIC_RECEPTIONS_DETAILS,
        suggestions: `${process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS}${document[fields.TYPE]}`,
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

    return (
        <Panel>
            <ReceptionForm {...receptionProps} />
            <Details {...detailProps} />
            <Search {...searchProps} />
            <Toast ref={notification} />
        </Panel>
    );
};
