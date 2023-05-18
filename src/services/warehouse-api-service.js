import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';

let session = {};
export const setWarehouseSession = (_session) => {
    session = { ..._session };
};

const findAllWarehousesAsOption = async () => {
    console.log('findAllWarehousesAsOption sesssion ====>', session);
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS;
    const response = await useGet(endpoint, session);

    return response;
};

const warehouseServices = {
    findAllWarehousesAsOption,
};

export default warehouseServices;
