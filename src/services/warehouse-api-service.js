import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';

const findAllWarehousesAsOption = async () => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS;
    const response = await useGet(endpoint);

    return response;
};

const warehouseServices = {
    findAllWarehousesAsOption,
};

export default warehouseServices;
