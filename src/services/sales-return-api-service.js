import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useDelete } from '@hooks/useDelete';

let session = {};
export const setSalesReturnDocumentSession = (_session) => {
    session = { ..._session };
};

const findAllReceptionSalesReturnDocumentAsPage = async () => {
    console.log('findAllReceptionSalesReturnDocumentAsPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint, session);

    return response;
};

const findAllReceptionSalesReturnDocumentByPage = async (page) => {
    console.log('findAllReceptionSalesReturntDocumentByPage sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url, session);

    return response;
};

const findReceptionSalesReturnDocumentById = async (id) => {
    console.log('findReceptionSalesReturnDocumentById sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url, session);

    return response;
};

const postReceptionSalesReturnDocument = async (document) => {
    console.log('postReceptionSalesReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_POST;
    const response = await usePost(endpoint, session, document);

    return response;
};

const putReceptionSalesReturnDocument = async (document) => {
    console.log('putReceptionSalesReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_PUT;
    const url = replaceParams(endpoint, { id: document.id });
    const response = await usePut(url, session, document);

    return response;
};

const releaseReceptionSalesReturnDocument = async (id) => {
    console.log('releaseReceptionSalesReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_RELEASE;
    const url = replaceParams(endpoint, { id });
    const response = await usePut(url, session, {});

    return response;
};

const deleteReceptionSalesReturnDocument = async (id) => {
    console.log('deleteReceptionSalesReturnDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SALES_RETURN_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useDelete(url, session);
    return response;
};

const salesReturnServices = {
    putReceptionSalesReturnDocument,
    postReceptionSalesReturnDocument,
    deleteReceptionSalesReturnDocument,
    releaseReceptionSalesReturnDocument,
    findReceptionSalesReturnDocumentById,
    findAllReceptionSalesReturnDocumentByPage,
    findAllReceptionSalesReturnDocumentAsPage,
};

export default salesReturnServices;
