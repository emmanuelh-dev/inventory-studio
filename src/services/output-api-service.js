import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useDelete } from '@hooks/useDelete';

const findAllDispatchOutputDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint);

    return response;
};

const findAllDispatchOutputDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url);

    return response;
};

const findDispatchOutputDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url);

    return response;
};

const postDispatchOutputDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_POST;
    const response = await usePost(endpoint, document);

    return response;
};

const putDispatchOutputDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, document);

    return response;
};

const releaseDispatchOutputDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, {});

    return response;
};

const deleteDispatchOutputDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useDelete(url);
    return response;
};

const outputServices = {
    putDispatchOutputDocument,
    postDispatchOutputDocument,
    deleteDispatchOutputDocument,
    releaseDispatchOutputDocument,
    findDispatchOutputDocumentById,
    findAllDispatchOutputDocumentByPage,
    findAllDispatchOutputDocumentAsPage,
};

export default outputServices;
