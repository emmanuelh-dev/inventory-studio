import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';

let session = {};
export const setItemSession = (_session) => {
    session = { ..._session };
};
const findAllItemsAsOptionForDistpatchDocument = async (id) => {
    console.log('findAllItemsAsOptionForDistpatchDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_ITESM_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url, session);
    return response;
};

const findAllItemsAsOptionForReceptionDocument = async () => {
    console.log('findAllItemsAsOptionForReceptionDocument sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_OPTIONS;
    const response = await useGet(endpoint, session);
    return response;
};

const itemServices = {
    findAllItemsAsOptionForReceptionDocument,
    findAllItemsAsOptionForDistpatchDocument,
};

export default itemServices;
