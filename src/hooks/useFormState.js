import { useState } from 'react';
import { isEmpty, getValue, stringToDate, findObjectByProp } from '@utils';
import {
    detailState,
    dispatchFields,
    outputDocumentState,
    purchaseReturnDocumentState,
} from '@constants';

const fields = { ...dispatchFields };
export const useFormState = (initialState, defaultInitialState) => {
    initialState = isEmpty(initialState) ? defaultInitialState : initialState;
    const [state, setState] = useState(initialState);

    const updateField = (field, event) => {
        let value = getValue(event);
        const _state = { ...state };
        _state[field] = value;
        updateState(_state);
    };

    const updateState = (_state) => {
        setState(_state);
    };

    return { state, updateField, updateState };
};

export const useForm = (initialState, defaultInitialState) => {
    initialState = isEmpty(initialState) ? defaultInitialState : initialState;
    const [document, setDocument] = useState(initialState);
    const [documentCopy, setDocumentCopy] = useState(initialState);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
    const [initialDocument, setInitialDocument] = useState(initialState);

    const updateDocumentField = (field, fieldValue) => {
        let value = Array.isArray(fieldValue) ? fieldValue : getValue(fieldValue);
        const state = { ...document };
        state[field] = value;
        updateDocument(state);
    };

    const updateDocument = (value) => {
        setDocument(value);
    };

    const updateDocumentCopy = (value) => {
        setDocumentCopy(value);
    };

    const updateSaveButtonStatus = () => {
        const original = JSON.stringify(document);
        const copy = JSON.stringify(documentCopy);
        const defaultState = JSON.stringify(initialDocument);
        const result = original === copy || original === defaultState;
        setSaveButtonDisabled(result);
    };

    const clearDocument = () => {
        updateDocument(initialDocument);
        updateDocumentCopy(initialDocument);
    };

    const updateDocumentFromService = (response) => {
        const data = stringToDate(response);
        updateDocument(data);
        updateDocumentCopy(data);
    };

    const updateInitialDocument = (type) => {
        if (type === initialDocument.type) return;
        const value = type === 'OUTPUT' ? outputDocumentState : purchaseReturnDocumentState;
        setInitialDocument(value);
        updateDocument(value);
        updateDocumentCopy(value);
    };

    const releaseButtonStatusDisabled = () => {
        return !saveButtonDisabled || releasedOrEmpty();
    };

    const deleteButtonStatusDisabled = () => {
        return releasedOrEmpty();
    };

    const releasedOrEmpty = () => {
        return isEmpty(document[fields.ID]) || document[fields.STATUS] == 'RELEASED';
    };

    return {
        document,
        documentCopy,
        clearDocument,
        updateDocument,
        saveButtonDisabled,
        updateDocumentCopy,
        updateDocumentField,
        updateInitialDocument,
        updateSaveButtonStatus,
        updateDocumentFromService,
        deleteButtonStatusDisabled,
        releaseButtonStatusDisabled,
    };
};

export const useDetail = () => {
    const createRow = (detail, counter) => {
        const row = { ...detailState };
        row[fields.LINE_NUMBER] = counter;
        row[fields.ITEM] = detail[fields.ITEM];
        row[fields.QUANTITY] = detail[fields.QUANTITY];
        row[fields.UNIT_PRICE] = detail[fields.UNIT_PRICE];
        row[fields.TOTAL_PRICE] = detail[fields.TOTAL_PRICE];
        row[fields.DESCRIPTION] = detail[fields.DESCRIPTION];

        return row;
    };

    const removeRows = (details, selection) => {
        const result = details.reduce((accumulator, element) => {
            const deletedRows = findObjectByProp(
                selection,
                fields.LINE_NUMBER,
                element[fields.LINE_NUMBER]
            );

            if (isEmpty(deletedRows)) {
                accumulator.unshift(element);
            } else if (!isEmpty(deletedRows) && deletedRows[fields.ID]) {
                element[fields.DELETED] = true;
                accumulator.unshift(element);
            }

            return accumulator;
        }, []);

        return sortRow(result);
    };

    const sortRow = (details) => {
        details.sort((first, second) => {
            return second[fields.LINE_NUMBER] - first[fields.LINE_NUMBER];
        });

        return details;
    };

    const updateRowTotalPrice = (details, detail) => {
        const result = details.find((element, index) => {
            if (element.item.id == detail.item.id) {
                element.quantity = element.quantity + detail.quantity;
                element.totalPrice = element.quantity * element.unitPrice;
                return { index, detail: element };
            }
        });

        if (result != undefined) {
            details[result.index] = result.detail;
            return { details };
        }

        return {};
    };

    return { createRow, removeRows, updateRowTotalPrice };
};

export const useStateStatus = (state, field) => {
    const [usedIcon, setUsedIcon] = useState('pi pi-lock-open');
    const [usedLabel, setUsedLabel] = useState('Desbloqueado');

    const updateStateStatus = () => {
        if (state[field]) {
            setUsedIcon('pi pi-lock');
            setUsedLabel('Bloqueado');
        } else {
            setUsedIcon('pi pi-lock-open');
            setUsedLabel('Desbloqueado');
        }
    };

    return { usedIcon, usedLabel, updateStateStatus };
};
