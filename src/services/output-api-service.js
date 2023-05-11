import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useDelete } from '@hooks/useDelete';

let session = {};
export const setOutputDocumentSession = (_session) => {
    session = { ..._session };
};

const findAllDispatchOutputDocumentAsPage = async () => {
    console.log('findAllDispatchOutputDocumentsAsPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint, session);

    return response;
};

const findAllDispatchOutputDocumentByPage = async (page) => {
    console.log('findAllDispatchOutputDocumentsByPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url, session);

    return response;
};

const findDispatchOutputDocumentById = async (id) => {
    console.log('findDispatchOutputDocumentById sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url, session);

    return response;
};

const postDispatchOutputDocument = async (document) => {
    console.log('postDispatchOutputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_POST;
    const response = await usePost(endpoint, session, document);

    return response;
};

const putDispatchOutputDocument = async (document) => {
    console.log('putDispatchOutputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, session, document);

    return response;
};

const releaseDispatchOutputDocument = async (id) => {
    console.log('releaseDispatchOutputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_OUTPUT_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, session, {});

    return response;
};

const deleteDispatchOutputDocument = async (id) => {
    console.log('deleteDispatchOutputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useDelete(url, session);

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
