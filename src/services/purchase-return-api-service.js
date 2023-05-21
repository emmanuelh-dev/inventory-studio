import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';

const findAllDispatchPurchaseReturnDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint);

    return response;
};

const findAllDispatchPurchaseReturnDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url);

    return response;
};

const findDispatchPurchaseReturnDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url);

    return response;
};

const findDispatchPurchaseReturnDocumentByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await useGet(url);

    return response;
};

const postDispatchPurchaseReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_POST;
    const response = await usePost(endpoint, document);

    return response;
};

const putDispatchPurchaseReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, document);

    return response;
};

const releaseDispatchPurchaseReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, {});

    return response;
};

const deleteDispatchPurchaseReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_PURCHASE_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, {});

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
