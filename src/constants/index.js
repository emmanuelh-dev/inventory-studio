const ID = 'id';
const TYPE = 'type';
const DATE = 'date';
const USED = 'used';
const STATUS = 'status';
const COUNTER = 'counter';
const DETAILS = 'details';
const DELETED = 'deleted';
const ITEM_NAME = 'itemName';
const WAREHOUSE = 'warehouse';
const DESCRIPTION = 'description';
const TOTAL_AMOUNT = 'totalAmount';
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
    id: '',
    type: 'INPUT',
    date: new Date(),
    status: 'Open',
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
    DATE,
    STATUS,
    COUNTER,
    DETAILS,
    DELETED,
    WAREHOUSE,
    DESCRIPTION,
    TOTAL_AMOUNT,
    TOTAL_QUANTITY,
};
