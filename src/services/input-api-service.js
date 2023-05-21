import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useDelete } from '@hooks/useDelete';

let session = {};
export const setInputDocumentSession = (_session) => {
    session = { ..._session };
};

const findAllReceptionInputDocumentAsPage = async () => {
    console.log('findAllReceptionInputDocumentAsPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint, session);

    return response;
};

const findAllReceptionInputDocumentByPage = async (page) => {
    console.log('findAllReceptionInputDocumentByPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url, session);

    return response;
};

const findReceptionInputDocumentById = async (id) => {
    console.log('findReceptionInputDocumentById sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url, session);
    return response;
};

const findReceptionInputDocumentFilteredBy = async (filter) => {
    console.log('findReceptionInputDocumentFilteredBy sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await useGet(url, session);

    return response;
};

const postReceptionInputDocument = async (document) => {
    console.log('postReceptionInputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_POST;
    const response = await usePost(endpoint, session, document);

    return response;
};

const putReceptionInputDocument = async (document) => {
    console.log('putReceptionInputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, session, document);

    return response;
};

const releaseReceptionInputDocument = async (id) => {
    console.log('releaseReceptionInputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, session, {});

    return response;
};

const deleteReceptionInputDocument = async (id) => {
    console.log('deleteReceptionInputDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_INPUT_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useDelete(url, session);
    return response;
};

const inputServices = {
    putReceptionInputDocument,
    postReceptionInputDocument,
    deleteReceptionInputDocument,
    releaseReceptionInputDocument,
    findReceptionInputDocumentById,
    findAllReceptionInputDocumentByPage,
    findAllReceptionInputDocumentAsPage,
    findReceptionInputDocumentFilteredBy,
};
export default inputServices;
