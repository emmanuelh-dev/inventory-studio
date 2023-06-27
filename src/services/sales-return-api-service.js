import request from './api';
import { replaceParams } from '@utils';

const findAllReceptionSalesReturnDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_SUGGESTIONS_AS_PAGE;
    const response = await request.apiGet(endpoint);

    return response;
};

const findAllReceptionSalesReturnDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await urequest.apiGeteGet(url);

    return response;
};

const findReceptionSalesReturnDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);

    return response;
};

const findReceptionSalesReturnDocumentByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await request.apiGet(url);

    return response;
};

const postReceptionSalesReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_POST;
    const response = await request.apiPost(endpoint, document);

    return response;
};

const putReceptionSalesReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await request.apiPut(url, document);

    return response;
};

const releaseReceptionSalesReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiPut(url, {});

    return response;
};

const deleteReceptionSalesReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiDelete(url);
    return response;
};

const salesReturnServices = {
    putReceptionSalesReturnDocument,
    postReceptionSalesReturnDocument,
    deleteReceptionSalesReturnDocument,
    releaseReceptionSalesReturnDocument,
    findReceptionSalesReturnDocumentById,
    findReceptionSalesReturnDocumentByFilter,
    findAllReceptionSalesReturnDocumentByPage,
    findAllReceptionSalesReturnDocumentAsPage,
};

export default salesReturnServices;
