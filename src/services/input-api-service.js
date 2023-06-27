import request from './api';
import { replaceParams } from '@utils';

const findAllReceptionInputDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_SUGGESTIONS_AS_PAGE;
    const response = await request.apiGet(endpoint);

    return response;
};

const findAllReceptionInputDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await request.apiGet(url);

    return response;
};

const findReceptionInputDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);
    return response;
};

const findReceptionInputDocumentByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await request.apiGet(url);

    return response;
};

const postReceptionInputDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_POST;
    const response = await request.apiPost(endpoint, document);

    return response;
};

const putReceptionInputDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await request.apiPut(url, document);

    return response;
};

const releaseReceptionInputDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiPut(url, {});

    return response;
};

const deleteReceptionInputDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiDelete(url);
    return response;
};

const inputServices = {
    putReceptionInputDocument,
    postReceptionInputDocument,
    deleteReceptionInputDocument,
    releaseReceptionInputDocument,
    findReceptionInputDocumentById,
    findReceptionInputDocumentByFilter,
    findAllReceptionInputDocumentByPage,
    findAllReceptionInputDocumentAsPage,
};
export default inputServices;
