import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';

const findAllItemsAsOptionForDistpatchDocument = async (id) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_ITESM_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url);
    return response;
};

const findAllItemsAsOptionForReceptionDocument = async () => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_OPTIONS;
    const response = await useGet(endpoint);
    return response;
};

const findAllItemsAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint);
    return response;
};

const findAllItemsByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url);

    return response;
};

const itemServices = {
    findAllItemsAsPage,
    findAllItemsByPage,
    findAllItemsAsOptionForReceptionDocument,
    findAllItemsAsOptionForDistpatchDocument,
};

export default itemServices;
