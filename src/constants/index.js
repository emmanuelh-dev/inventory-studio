const ID = 'id';
const USED = 'used';
const DELETED = 'deleted';
const ITEM_NAME = 'itemName';
const DESCRIPTION = 'description';
const ITEM_SUMMARY = 'itemSummary';
const VALUATION_TYPE = 'valuationType';
const WAREHOUSE_NAME = 'warehouseName';

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
