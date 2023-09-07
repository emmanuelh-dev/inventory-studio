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
    detailFields,
    dispatchFields,
    receptionFields,
    inputDocumentState,
    outputDocumentState,
    salesReturnDocumentState,
    purchaseReturnDocumentState,
} from '@constants';

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
    const fields = isDispatchDocument(documentInitialState)
        ? { ...dispatchFields }
        : { ...receptionFields };
    defaultInitialState = isObjectEmpty(initialState)
        ? defaultInitialState
        : getDocumentState(documentInitialState[fields.TYPE]);
    const [document, setDocument] = useState(documentInitialState);
    const [documentCopy, setDocumentCopy] = useState(_.cloneDeep(documentInitialState));
    const [initialDocument, setInitialDocument] = useState(_.cloneDeep(defaultInitialState));

    const [documentEdited, setDocumentEdited] = useState(false);
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);
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
        updateDocument(_.cloneDeep(initialDocument));
        updateDocumentCopy(_.cloneDeep(initialDocument));
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
            const result =
                _.isEqual(document, documentCopy) || _.isEqual(document, initialDocument);
            return result;
        };

        const isReleasedOrEmpty = () => {
            return isNullOrUndefinedOrEmptyString(document.id) || isReleased(document.status);
        };

        const updateDocumentEditedStatus = () => {
            setDocumentEdited(!compareDocumentStates());
        };

        const updateReleaseButtonStatusDisabled = () => {
            const result = !compareDocumentStates() || isReleasedOrEmpty();
            setReleaseButtonDisabled(result);
        };

        const updateDeleteButtonStatusDisabled = () => {
            const result = !compareDocumentStates() || isReleasedOrEmpty();
            setDeleteButtonDisabled(result);
        };

        updateDocumentEditedStatus();
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
        documentEdited,
        initialDocument,
        addButtonDisabled,
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
    initialCounter = 0,
    initialDetails = [],
    initialQuantity = 0,
}) => {
    const fields = { ...detailFields };
    const [rowsEdited, setRowsEdited] = useState(false);
    const [rows, setRows] = useState(_.cloneDeep(initialDetails));
    const [totalAmount, setTotalAmount] = useState(initialAmount);
    const [lineCounter, setLineCounter] = useState(initialCounter);
    const [totalQuantity, setTotalQuantity] = useState(initialQuantity);
    const [rowsCopy, setRowsCopy] = useState(_.cloneDeep(initialDetails));

    const incrementLineCounter = () => {
        setLineCounter(lineCounter + 1);
    };

    const createDetail = (detail) => {
        const row = _.cloneDeep(detailState);
        const nextCounter = lineCounter + 1;
        row[fields.LINE_NUMBER] = nextCounter;
        row[fields.QUANTITY] = detail[fields.QUANTITY];
        row[fields.UNIT_PRICE] = detail[fields.UNIT_PRICE];
        row[fields.ITEM] = _.cloneDeep(detail[fields.ITEM]);
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
        const data = _.cloneDeep(details);
        setRows(data);
    };

    const updateRowsCopy = (details) => {
        const data = _.cloneDeep(details);
        setRowsCopy(data);
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

    const resetDetails = () => {
        updateRows(initialDetails);
        setTotalAmount(initialAmount);
        updateRowsCopy(initialDetails);
        setLineCounter(initialCounter);
        setTotalQuantity(initialQuantity);
    };

    const updateDetailFromService = (details, counter, totalAmount, totalQuantity) => {
        updateRows(details);
        updateRowsCopy(details);
        setLineCounter(counter);
        setTotalAmount(totalAmount);
        setTotalQuantity(totalQuantity);
    };

    const clearDetails = () => {
        updateRows([]);
        setTotalAmount(0);
        setLineCounter(0);
        updateRowsCopy([]);
        setTotalQuantity(0);
    };

    useEffect(() => {
        const calcTotalAmount = () => {
            return rows.reduce((previousValue, element) => {
                if (element.deleted) {
                    return previousValue + 0;
                }
                return previousValue + element.totalPrice;
            }, 0);
        };

        const calcTotalQuantity = () => {
            return rows.reduce((previousValue, element) => {
                if (element.deleted) {
                    return previousValue + 0;
                }
                return previousValue + element.quantity;
            }, 0);
        };

        let resultTotalAmount = 0;
        let resultTotalQuantity = 0;
        if (rows.length > 0) {
            resultTotalAmount = calcTotalAmount();
            resultTotalQuantity = calcTotalQuantity;
        }
        setTotalAmount(resultTotalAmount);
        setTotalQuantity(resultTotalQuantity);
        setRowsEdited(!_.isEqual(rows, rowsCopy));
    }, [rows, rowsCopy]);

    return {
        rows,
        sortRow,
        addDetail,
        rowsEdited,
        lineCounter,
        totalAmount,
        createDetail,
        resetDetails,
        clearDetails,
        totalQuantity,
        removeDetails,
        updateDetails,
        incrementLineCounter,
        updateDetailFromService,
    };
};

export const useRowData = () => {
    const [rowData, setRowData] = useState(_.cloneDeep(detailState));

    const updateRowData = (value) => {
        setRowData(_.cloneDeep(value));
    };

    const updateRowDataField = (field, fieldValue) => {
        const data = _.cloneDeep(rowData);
        let value = getValue(fieldValue);
        if ((field === 'quantity' || field === 'unitPrice') && typeof value !== 'number') {
            value = 0;
        }

        data[field] = value;
        updateRowData(data);
    };

    const clearRowData = () => {
        updateRowData(detailState);
    };

    useEffect(() => {
        const updateRowDataTotalPrice = () => {
            const value = rowData.quantity * rowData.unitPrice;
            updateRowDataField('totalPrice', { target: { value } });
        };
        updateRowDataTotalPrice();
    }, [rowData.quantity, rowData.unitPrice]);

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
