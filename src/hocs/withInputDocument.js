import React, { useEffect } from 'react';
//constants
import { receptionState, receptionFields, detailState } from '@constants';
import { receptionTypes, dropdownLabelOptions, toolbar } from '@constants/options';
//hooks
import { useCopy } from '@hooks/useCopy';
import { useFormState } from '../hooks/useFormState';
import { useNotification } from '@hooks/useNotification';
import { useNew, useSaveWithDetails } from '@hooks/useToolbar';
import { useDropdownOptions } from '@hooks/useDropdownOptions';

export const withInputDocument = (WrappedComponent) => (props) => {
    const fields = { ...receptionFields };
    const endpoint = {
        save: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        details: process.env.NEXT_PUBLIC_RECEPTIONS_DETAILS,
        warehouses: process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS,
    };

    //states
    const {
        state: document,
        updateField: updateDocumentField,
        updateState: updateDocument,
    } = useFormState({}, { ...receptionState });
    const {
        state: details,
        updateField: updateDetailField,
        updateState: updateDetails,
    } = useFormState({}, { data: [] });

    //actions
    const { documentToolbar, notification } = useDocumentToolbar(
        fields,
        endpoint,
        document,
        details,
        updateDocument,
        updateDetails
    );

    //static options
    const options = {
        documentTypes: receptionTypes,
        documentToolbar,
    };
    //data options
    const { dropdownOptions } = useFetchDropdownOptions(endpoint);

    return (
        <WrappedComponent
            document={document}
            details={details}
            fields={fields}
            options={options}
            endpoint={endpoint}
            updateDocumentField={updateDocumentField}
            dropdownOptions={dropdownOptions}
            // controlQuantity={controlQuantity}
            // updateControlQuantity={updateControlQuantity}
            // controlAmount={controlAmount}
            // updateControlAmount={updateControlAmount}
            notification={notification}
        />
    );
};

const useDocumentToolbar = (fields, endpoint, document, details, updateDocument, updateDetails) => {
    const { notification, showNotification } = useNotification();
    const { buttonState, updateCopy, updateSaveButton } = useCopy({ ...receptionState }, document);
    const { onNew } = useNew(updateDocument, updateCopy, { ...receptionState });
    const { onSave, updateParams } = useSaveWithDetails(
        fields.ID,
        updateDetails,
        endpoint,
        showNotification
    );

    const documentToolbar = [...toolbar];
    documentToolbar[0].command = onNew;
    documentToolbar[1].command = () => {
        onSave(document, updateDocument, updateCopy);
    };

    useEffect(() => {
        if (!document[fields.ID]) {
            updateParams({ type: document[fields.TYPE] });
        } else {
            updateParams({ type: document[fields.TYPE], id: document[fields.ID] });
        }
    }, [document[fields.ID], document[fields.TYPE]]);

    return { documentToolbar, notification };
};

const useFetchDropdownOptions = (endpoint) => {
    const { dropdownOptions } = useDropdownOptions(
        endpoint.warehouses,
        dropdownLabelOptions.warehouse
    );

    return { dropdownOptions };
};