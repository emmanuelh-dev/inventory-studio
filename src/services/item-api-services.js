import { useGet } from '@hooks/useGet';

let session = {};
export const setItemSession = (_session) => {
    session = { ..._session };
};
const findAllItemsAsOption = async () => {
    console.log('findAllItemsAsOption sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_OPTIONS;
    const response = await useGet(endpoint, session);

    return response;
};

const itemServices = {
    findAllItemsAsOption,
};

export default itemServices;
