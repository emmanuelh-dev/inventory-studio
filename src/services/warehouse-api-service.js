import request from './api';
import { replaceParams } from '@utils';

const findAllWarehousesAsOption = async () => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS;
    const response = await request.apiGet(endpoint);

    return response;
};

const findAllWarehousesAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS_AS_PAGE;
    const response = await request.apiGet(endpoint);
    return response;
};

const findAllWarehousesByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await request.apiGet(url);

    return response;
};

const findWarehouseById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);

    return response;
};

const findWarehousesByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await request.apiGet(url);

    return response;
};

const postWarehouse = async (warehouse) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_POST;
    const response = await request.apiPost(endpoint, warehouse);

    return response;
};

const putWarehouse = async (warehouse) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_PUT;
    const url = replaceParams(endpoint, { id: warehouse.id });
    const response = await request.apiPut(url, warehouse);

    return response;
};

const findAllItemSummaryByIdAsPage = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_ITEM_SUMMARY_BY_ID;
    const url = replaceParams(endpoint, { id, page: 0 });
    const response = await request.apiGet(url);

    return response;
};

const findAllItemSummaryByIdByPage = async (id, page) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_ITEM_SUMMARY_BY_ID;
    const url = replaceParams(endpoint, { id, page });
    const response = await request.apiGet(url);

    return response;
};

const warehouseServices = {
    putWarehouse,
    postWarehouse,
    findWarehouseById,
    findWarehousesByFilter,
    findAllWarehousesAsPage,
    findAllWarehousesByPage,
    findAllWarehousesAsOption,
    findAllItemSummaryByIdAsPage,
    findAllItemSummaryByIdByPage,
};

export default warehouseServices;
