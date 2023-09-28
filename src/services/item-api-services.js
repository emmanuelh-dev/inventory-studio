import request from './api';
import { replaceParams } from '@utils';

const findAllItemsAsOptionForDistpatchDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_ITESM_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);
    return response;
};

const findAllItemsAsOptionForReceptionDocument = async () => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_OPTIONS;
    const response = await request.apiGet(endpoint);
    return response;
};

const findAllItemsAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS_AS_PAGE;
    const response = await request.apiGet(endpoint);
    return response;
};

const findAllItemsByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await request.apiGet(url);

    return response;
};

const findItemById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);

    return response;
};

const findItemsByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await request.apiGet(url);

    return response;
};

const postItem = async (item) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_POST;
    const response = await request.apiPost(endpoint, item);

    return response;
};

const putItem = async (item) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_PUT;
    const url = replaceParams(endpoint, { id: item.id });
    const response = await request.apiPut(url, item);

    return response;
};

const deleteItem = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiDelete(url);
    return response;
};

const itemServices = {
    putItem,
    postItem,
    deleteItem,
    findItemById,
    findItemsByFilter,
    findAllItemsAsPage,
    findAllItemsByPage,
    findAllItemsAsOptionForReceptionDocument,
    findAllItemsAsOptionForDistpatchDocument,
};

export default itemServices;
