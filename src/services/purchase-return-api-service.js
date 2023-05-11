import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';

let session = {};
export const setPurchaseReturnDocumentSession = (_session) => {
    session = { ..._session };
};

const findAllDispatchPurchaseReturnDocumentAsPage = async () => {
    console.log('findAllDispatchPurchaseReturnDocumentsAsPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint, session);

    return response;
};

const findAllDispatchPurchaseReturnDocumentByPage = async (page) => {
    console.log('findAllDispatchPurchaseReturnDocumentsByPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url, session);

    return response;
};

const findDispatchPurchaseReturnDocumentById = async (id) => {
    console.log('findDispatchPurchaseReturnDocumentById sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url, session);

    return response;
};

const postDispatchPurchaseReturnDocument = async (document) => {
    console.log('postDispatchPurchaseReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_POST;
    const response = await usePost(endpoint, session, document);

    return response;
};

const putDispatchPurchaseReturnDocument = async (document) => {
    console.log('putDispatchPurchaseReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, session, document);

    return response;
};

const releaseDispatchPurchaseReturnDocument = async (document) => {
    console.log('releaseDispatchPurchaseReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_RELEASE;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, session, {});

    return response;
};

const deleteDispatchPurchaseReturnDocument = async (id) => {
    console.log('deleteDispatchPurchaseReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, session, {});

    return response;
};

const purchaseReturnServices = {
    putDispatchPurchaseReturnDocument,
    postDispatchPurchaseReturnDocument,
    deleteDispatchPurchaseReturnDocument,
    releaseDispatchPurchaseReturnDocument,
    findDispatchPurchaseReturnDocumentById,
    findAllDispatchPurchaseReturnDocumentAsPage,
    findAllDispatchPurchaseReturnDocumentByPage,
};

export default purchaseReturnServices;
