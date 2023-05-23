import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';

const findAllWarehousesAsOption = async () => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS;
    const response = await useGet(endpoint);

    return response;
};

const findAllWarehousesAsPage = async () => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS_AS_PAGE;
    const response = await useGet(endpoint);
    return response;
};

const findAllWarehousesByPage = async (page) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS_BY_PAGE;
    const url = replaceParams(endpoint, { page });
    const response = await useGet(url);

    return response;
};

const findWarehousesByFilter = async (filter) => {
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_FILTER;
    const url = replaceParams(endpoint, filter);
    const response = await useGet(url);

    return response;
};

const warehouseServices = {
    findWarehousesByFilter,
    findAllWarehousesAsPage,
    findAllWarehousesByPage,
    findAllWarehousesAsOption,
};

export default warehouseServices;
