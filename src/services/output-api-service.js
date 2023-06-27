import request from './api';
import { replaceParams } from '@utils';

const findAllDispatchOutputDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_SUGGESTIONS_AS_PAGE;
    const response = await request.apiGet(endpoint);

    return response;
};

const findAllDispatchOutputDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await request.apiGet(url);

    return response;
};

const findDispatchOutputDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiGet(url);

    return response;
};

const findDispatchOutputDocumentByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await request.apiGet(url);

    return response;
};

const postDispatchOutputDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_POST;
    const response = await request.apiPost(endpoint, document);

    return response;
};

const putDispatchOutputDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await request.apiPut(url, document);

    return response;
};

const releaseDispatchOutputDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiPut(url, {});

    return response;
};

const deleteDispatchOutputDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await request.apiDelete(url);
    return response;
};

const outputServices = {
    putDispatchOutputDocument,
    postDispatchOutputDocument,
    deleteDispatchOutputDocument,
    releaseDispatchOutputDocument,
    findDispatchOutputDocumentById,
    findDispatchOutputDocumentByFilter,
    findAllDispatchOutputDocumentByPage,
    findAllDispatchOutputDocumentAsPage,
};

export default outputServices;
