import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';

let session = {};
export const setItemSession = (_session) => {
    session = { ..._session };
};
const findAllItemsAsOption = async (id) => {
    console.log('findAllItemsAsOption sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_ITESM_BY_ID;
    const url = replaceParams(endpoint, { id });
    const response = await useGet(url, session);
    return response;
};

const itemServices = {
    findAllItemsAsOption,
};

export default itemServices;
