import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useDelete } from '@hooks/useDelete';

const findAllReceptionSalesReturnDocumentAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint);

    return response;
};

const findAllReceptionSalesReturnDocumentByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url);

    return response;
};

const findReceptionSalesReturnDocumentById = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url);

    return response;
};

const findReceptionSalesReturnDocumentByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await useGet(url);

    return response;
};

const postReceptionSalesReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_POST;
    const response = await usePost(endpoint, document);

    return response;
};

const putReceptionSalesReturnDocument = async (document) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, document);

    return response;
};

const releaseReceptionSalesReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, {});

    return response;
};

const deleteReceptionSalesReturnDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useDelete(url);
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
