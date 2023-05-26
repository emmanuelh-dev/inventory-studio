import { useState, useEffect } from 'react';
import {
    isObjectEmpty,
    getValue,
    stringToDate,
    isInputDocument,
    isOutputDocument,
    findObjectByProp,
    isDispatchDocument,
} from '@utils';
import {
    detailState,
    dispatchFields,
    receptionFields,
    inputDocumentState,
    outputDocumentState,
    salesReturnDocumentState,
    purchaseReturnDocumentState,
} from '@constants';

let fields = {};

const getDocumentState = (type) => {
    if (isDispatchDocument(type)) {
        return isOutputDocument(type) ? outputDocumentState : purchaseReturnDocumentState;
    }

    return isInputDocument(type) ? inputDocumentState : salesReturnDocumentState;
};

export const useFormState = (initialState, defaultInitialState) => {
    initialState = isObjectEmpty(initialState) ? defaultInitialState : initialState;
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
    initialState = isObjectEmpty(initialState) ? defaultInitialState : initialState;
    const [form, setForm] = useState(initialState);
    const [formCopy, setFormCopy] = useState(initialState);
    const [initialForm, setInitialForm] = useState(defaultInitialState);

    const updateFormField = (field, fieldValue) => {
        const value = getValue(fieldValue);
        const state = { ...form };
        state[field] = value;
        updateForm(state);
    };

    const updateForm = (value) => {
        setForm(value);
    };

    const updateFormCopy = (value) => {
        setFormCopy(value);
    };

    const clearForm = () => {
        updateForm(initialForm);
        updateFormCopy(initialForm);
    };

    const updateSaveButtonStatus = () => {
        const original = JSON.stringify(form);
        const copy = JSON.stringify(formCopy);
        const defaultState = JSON.stringify(initialForm);
        const result = original === copy || original === defaultState;
        return result;
    };

    const updateFormFromService = (response) => {
        const data = stringToDate(response);
        updateForm(data);
        updateFormCopy(data);
    };

    return {
        form,
        clearForm,
        updateForm,
        updateFormCopy,
        updateFormField,
        updateFormFromService,
        updateSaveButtonStatus,
    };
};

export const useDocumentForm = (initialState) => {
    const defaultInitialState = getDocumentState(initialState[fields.TYPE]);
    initialState = isObjectEmpty(initialState) ? defaultInitialState : initialState;
    fields = isDispatchDocument(initialState) ? { ...dispatchFields } : { ...receptionFields };
    const [document, setDocument] = useState(initialState);
    const [documentCopy, setDocumentCopy] = useState(initialState);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
    const [initialDocument, setInitialDocument] = useState(defaultInitialState);

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
        const value = getDocumentState(type);
        setInitialDocument(value);
        updateDocument(value);
        updateDocumentCopy(value);
    };

    const addButtonStatusDisabled = () => {
        return isReleased() || isObjectEmpty(document[fields.WAREHOUSE]);
    };

    const releaseButtonStatusDisabled = () => {
        return !saveButtonDisabled || releasedOrEmpty();
    };

    const deleteButtonStatusDisabled = () => {
        return releasedOrEmpty();
    };

    const releasedOrEmpty = () => {
        return isObjectEmpty(document[fields.ID]) || isReleased();
    };

    const isReleased = () => {
        return document[fields.STATUS] == 'RELEASED';
    };

    return {
        document,
        isReleased,
        documentCopy,
        clearDocument,
        updateDocument,
        saveButtonDisabled,
        updateDocumentCopy,
        updateDocumentField,
        updateInitialDocument,
        updateSaveButtonStatus,
        addButtonStatusDisabled,
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

            if (isObjectEmpty(deletedRows)) {
                accumulator.unshift(element);
            } else if (!isObjectEmpty(deletedRows) && deletedRows[fields.ID]) {
                element[fields.DELETED] = true;
                accumulator.unshift(element);
            }

            return accumulator;
        }, []);

        return sortRow(result);
    };

    const updateRows = (details, detail) => {
        const index = details.findIndex(
            (element) => element[fields.LINE_NUMBER] == detail[fields.LINE_NUMBER]
        );

        if (index > -1) {
            details[index] = detail;

            return details;
        }

        return [];
    };

    const sortRow = (details) => {
        details.sort((first, second) => {
            return second[fields.LINE_NUMBER] - first[fields.LINE_NUMBER];
        });

        return details;
    };

    return { createRow, removeRows, updateRows };
};

export const useRowData = () => {
    const [rowData, setRowData] = useState(detailState);

    const updateRowData = (value) => {
        setRowData(value);
    };

    const updateRowDataField = (field, fieldValue) => {
        const state = { ...rowData };
        const value = getValue(fieldValue);
        state[field] = value;
        updateRowData(state);
    };

    const updateRowDataTotalPrice = () => {
        const value = rowData[fields.QUANTITY] * rowData[fields.UNIT_PRICE];
        updateRowDataField(fields.TOTAL_PRICE, { target: { value } });
    };

    const clearRowData = () => {
        updateRowData(detailState);
    };

    useEffect(() => {
        updateRowDataTotalPrice();
    }, [rowData[fields.QUANTITY], rowData[fields.UNIT_PRICE]]);

    return { rowData, clearRowData, updateRowData, updateRowDataField };
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
