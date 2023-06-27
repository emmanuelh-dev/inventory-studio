import request from './api';
import { replaceParams } from '@utils';

const findAllDispatchPurchaseReturnDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_SUGGESTIONS_AS_PAGE;
    const response = await request.apiGet(endpoint);

    return response;
};

const findAllDispatchPurchaseReturnDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await request.apiGet(url);

    return response;
};

const findDispatchPurchaseReturnDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);

    return response;
};

const findDispatchPurchaseReturnDocumentByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await request.apiGet(url);

    return response;
};

const postDispatchPurchaseReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_POST;
    const response = await request.apiPost(endpoint, document);

    return response;
};

const putDispatchPurchaseReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await request.apiPut(url, document);

    return response;
};

const releaseDispatchPurchaseReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiPut(url, {});

    return response;
};

const deleteDispatchPurchaseReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiDelete(url);

    return response;
};

const purchaseReturnServices = {
    putDispatchPurchaseReturnDocument,
    postDispatchPurchaseReturnDocument,
    deleteDispatchPurchaseReturnDocument,
    releaseDispatchPurchaseReturnDocument,
    findDispatchPurchaseReturnDocumentById,
    findDispatchPurchaseReturnDocumentByFilter,
    findAllDispatchPurchaseReturnDocumentAsPage,
    findAllDispatchPurchaseReturnDocumentByPage,
};

export default purchaseReturnServices;
