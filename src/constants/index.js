import { MESSAGES } from '@messages';

const ID = 'id';
const KEY = 'key';
const TYPE = 'type';
const DATE = 'date';
const ITEM = 'item';
const USED = 'used';
const STATUS = 'status';
const COUNTER = 'counter';
const DETAILS = 'details';
const DELETED = 'deleted';
const QUANTITY = 'quantity';
const ITEM_NAME = 'itemName';
const WAREHOUSE = 'warehouse';
const UNIT_PRICE = 'unitPrice';
const LINE_NUMBER = 'lineNumber';
const TOTAL_PRICE = 'totalPrice';
const DESCRIPTION = 'description';
const TOTAL_AMOUNT = 'totalAmount';
const LAST_UPDATED = 'lastUpdated';
const ITEM_SUMMARY = 'itemSummary';
const VALUATION_TYPE = 'valuationType';
const WAREHOUSE_NAME = 'warehouseName';
const TOTAL_QUANTITY = 'totalQuantity';

export const DOCUMENT_TYPES = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT',
    SALES_RETURN: 'SALES_RETURN',
    PURCHASE_RETURN: 'PURCHASE_RETURN',
};

export const itemState = {
    id: null,
    itemName: '',
    description: '',
    valuationType: 'AVERAGE',
    used: false,
};

export const itemFields = {
    ID,
    USED,
    ITEM_NAME,
    DESCRIPTION,
    VALUATION_TYPE,
};

export const warehouseState = {
    id: null,
    warehouseName: '',
    itemSummary: [],
    used: false,
    deleted: false,
};

export const warehouseFields = {
    ID,
    USED,
    DELETED,
    ITEM_SUMMARY,
    WAREHOUSE_NAME,
};

export const inputDocumentState = {
    id: null,
    type: 'INPUT',
    date: new Date(),
    status: 'OPEN',
    warehouse: {},
    description: '',
    totalQuantity: 0,
    totalAmount: 0,
    counter: 0,
    deleted: false,
    details: [],
};

export const salesReturnDocumentState = {
    id: null,
    type: 'SALES_RETURN',
    date: new Date(),
    status: 'OPEN',
    warehouse: {},
    description: '',
    totalQuantity: 0,
    totalAmount: 0,
    counter: 0,
    deleted: false,
    details: [],
};

export const validationFields = {
    ID,
    ITEM,
    USED,
    STATUS,
    DELETED,
    ITEM_NAME,
    LINE_NUMBER,
};

export const receptionFields = {
    ID,
    TYPE,
    ITEM,
    DATE,
    STATUS,
    COUNTER,
    DETAILS,
    DELETED,
    QUANTITY,
    WAREHOUSE,
    UNIT_PRICE,
    DESCRIPTION,
    TOTAL_PRICE,
    LINE_NUMBER,
    TOTAL_AMOUNT,
    TOTAL_QUANTITY,
};

export const outputDocumentState = {
    id: null,
    type: 'OUTPUT',
    date: new Date(),
    status: 'OPEN',
    warehouse: {},
    description: '',
    totalQuantity: 0,
    totalAmount: 0,
    counter: 0,
    deleted: false,
    details: [],
};

export const purchaseReturnDocumentState = {
    id: null,
    type: 'PURCHASE_RETURN',
    date: new Date(),
    status: 'OPEN',
    warehouse: {},
    description: '',
    totalQuantity: 0,
    totalAmount: 0,
    counter: 0,
    deleted: false,
    details: [],
};

export const dispatchFields = {
    ID,
    TYPE,
    ITEM,
    DATE,
    STATUS,
    COUNTER,
    DETAILS,
    DELETED,
    QUANTITY,
    WAREHOUSE,
    UNIT_PRICE,
    DESCRIPTION,
    TOTAL_PRICE,
    LINE_NUMBER,
    TOTAL_AMOUNT,
    TOTAL_QUANTITY,
};

export const detailState = {
    id: null,
    lineNumber: 0,
    item: {},
    description: '',
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0,
    deleted: false,
};

export const itemSummaryFields = {
    KEY,
    ITEM,
    QUANTITY,
    UNIT_PRICE,
    TOTAL_PRICE,
    LAST_UPDATED,
};

const SUMMARY_TYPES = {
    ERROR: 'Error',
    SUCCESS: 'Exitoso',
};

const SEVERITY_TYPES = {
    ERROR: 'error',
    SUCCESS: 'success',
};

export const MESSAGE_TYPES = {
    SUCCESS: {
        life: 3000,
        summary: SUMMARY_TYPES.SUCCESS,
        severity: SEVERITY_TYPES.SUCCESS,
        detail: MESSAGES.SUCCESS_RECORD_CREATED,
    },
    ERROR: {
        life: 3000,
        summary: SUMMARY_TYPES.ERROR,
        severity: SEVERITY_TYPES.ERROR,
        detail: MESSAGES.ERROR_RECORD_CREATED,
    },
};
