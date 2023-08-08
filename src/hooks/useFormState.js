import _ from 'lodash';
import { useState, useEffect } from 'react';
import { isReleased } from '@utils/validations';
import {
    getValue,
    stringToDate,
    isObjectEmpty,
    isInputDocument,
    isOutputDocument,
    findObjectByProp,
    isDispatchDocument,
    isNullOrUndefinedOrEmptyString,
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

export const useDocumentForm = ({ initialState, defaultInitialState }) => {
    const documentInitialState = isObjectEmpty(initialState) ? defaultInitialState : initialState;
    fields = isDispatchDocument(documentInitialState)
        ? { ...dispatchFields }
        : { ...receptionFields };
    defaultInitialState = isObjectEmpty(initialState)
        ? defaultInitialState
        : getDocumentState(documentInitialState[fields.TYPE]);
    const [document, setDocument] = useState(documentInitialState);
    const [documentCopy, setDocumentCopy] = useState(_.cloneDeep(documentInitialState));
    const [initialDocument, setInitialDocument] = useState(_.cloneDeep(defaultInitialState));

    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
    const [releaseButtonDisabled, setReleaseButtonDisabled] = useState(true);

    const updateDocumentField = (field, fieldValue) => {
        let value = Array.isArray(fieldValue) ? fieldValue : getValue(fieldValue);
        const state = _.cloneDeep(document);
        state[field] = value;
        updateDocument(state);
    };

    const updateDocument = (value) => {
        setDocument(value);
    };

    const updateDocumentCopy = (value) => {
        setDocumentCopy(value);
    };

    function clearDocument() {
        updateDocument(initialDocument);
        updateDocumentCopy(initialDocument);
    }

    const updateDocumentFromService = (response) => {
        const data = _.cloneDeep(stringToDate(response));
        updateDocument(data);
        updateDocumentCopy(data);
    };

    const updateInitialDocument = (type) => {
        if (type === initialDocument.type) return;
        const value = _.cloneDeep(getDocumentState(type));
        setInitialDocument(value);
        updateDocument(value);
        updateDocumentCopy(value);
    };

    useEffect(() => {
        const compareDocumentStates = () => {
            const original = JSON.stringify(document);
            const copy = JSON.stringify(documentCopy);
            const defaultState = JSON.stringify(initialDocument);
            const result = original === copy || original === defaultState;
            return result;
        };

        const isReleasedOrEmpty = () => {
            return isNullOrUndefinedOrEmptyString(document.id) || isReleased(document.status);
        };

        const updateSaveButtonStatus = () => {
            setSaveButtonDisabled(compareDocumentStates());
        };

        const updateReleaseButtonStatusDisabled = () => {
            const result = !compareDocumentStates() || isReleasedOrEmpty();
            setReleaseButtonDisabled(result);
        };

        const updateDeleteButtonStatusDisabled = () => {
            const result = !compareDocumentStates() || isReleasedOrEmpty();
            setDeleteButtonDisabled(result);
        };

        updateSaveButtonStatus();
        updateDeleteButtonStatusDisabled();
        updateReleaseButtonStatusDisabled();
    }, [document, documentCopy, initialDocument]);

    useEffect(() => {
        const updateAddButtonStatusDisabled = () => {
            const result = isReleased(document.status) || isObjectEmpty(document.warehouse);
            setAddButtonDisabled(result);
        };

        updateAddButtonStatusDisabled();
    }, [document.status, document.warehouse]);

    return {
        document,
        documentCopy,
        clearDocument,
        updateDocument,
        initialDocument,
        addButtonDisabled,
        saveButtonDisabled,
        updateDocumentCopy,
        updateDocumentField,
        deleteButtonDisabled,
        releaseButtonDisabled,
        updateInitialDocument,
        updateDocumentFromService,
    };
};

export const useDetail = ({
    initialAmount = 0,
    initialCounter = 1,
    initialDetails = [],
    initialQuantity = 0,
}) => {
    const [rows, setRows] = useState(initialDetails);
    const [totalAmount, setTotalAmount] = useState(initialAmount);
    const [lineCounter, setLineCounter] = useState(initialCounter);
    const [totalQuantity, setTotalQuantity] = useState(initialAmount);

    const incrementLineCounter = () => {
        setLineCounter(lineCounter + 1);
    };

    const createDetail = (detail) => {
        const row = _.cloneDeep(detailState);
        row[fields.LINE_NUMBER] = lineCounter;
        row[fields.ITEM] = _.cloneDeep(detail[fields.ITEM]);
        row[fields.QUANTITY] = detail[fields.QUANTITY];
        row[fields.UNIT_PRICE] = detail[fields.UNIT_PRICE];
        row[fields.TOTAL_PRICE] = detail[fields.TOTAL_PRICE];
        row[fields.DESCRIPTION] = detail[fields.DESCRIPTION];
        return row;
    };

    const addDetail = (detail) => {
        const details = _.cloneDeep(rows);
        details.unshift(detail);
        updateRows(details);
        incrementLineCounter();
    };

    const updateRows = (details) => {
        const result = _.cloneDeep(details);
        setRows(result);
    };

    const updateRowByIndex = (index, detail) => {
        const details = _.cloneDeep(rows);
        details[index] = _.cloneDeep(detail);
        updateRows(details);
    };

    const updateDetails = (detail) => {
        const index = rows.findIndex(
            (element) => element[fields.ITEM][fields.ID] == detail[fields.ITEM][fields.ID]
        );

        if (index > -1) {
            updateRowByIndex(index, detail);
        }
    };

    const removeDetails = (selection) => {
        const result = rows.reduce((accumulator, element) => {
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

        const details = sortRow(result);
        updateRows(details);
    };

    const sortRow = (details) => {
        details.sort((first, second) => {
            return second[fields.LINE_NUMBER] - first[fields.LINE_NUMBER];
        });

        return details;
    };

    useEffect(() => {
        const resultTotalAmount = rows.reduce((previousValue, element) => {
            if (element[fields.DELETED]) {
                return previousValue + 0;
            }
            return previousValue + element[fields.TOTAL_PRICE];
        }, 0);

        const resultTotalQuantity = rows.reduce((previousValue, element) => {
            if (element[fields.DELETED]) {
                return previousValue + 0;
            }
            return previousValue + element[fields.QUANTITY];
        }, 0);

        setTotalAmount(resultTotalAmount);
        setTotalQuantity(resultTotalQuantity);
    }, [rows]);

    return {
        rows,
        sortRow,
        addDetail,
        lineCounter,
        totalAmount,
        createDetail,
        totalQuantity,
        removeDetails,
        updateDetails,
        incrementLineCounter,
    };
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
