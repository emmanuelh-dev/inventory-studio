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

export const receptionState = {
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

export const dispatchState = {
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
