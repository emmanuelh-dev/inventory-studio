import services from '@services/api-services';
import { warehouseSearchFields, warehouseFilters } from '@constants/options';

export const withWarehouseList = (WrappedComponent) => (props) => {
    const getDataAsPage = async () => {
        const result = await services.findAllWarehousesAsPage();
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllWarehousesByPage(page);
        return result;
    };

    const getDataByFilter = async (filter) => {
        const result = await services.findWarehousesByFilter(filter);
        return result;
    };

    const listProps = {
        redirect: 'warehouse/',
        filters: warehouseFilters,
        fields: warehouseSearchFields,
        getDataAsPage: getDataAsPage,
        getDataByPage: getDataByPage,
        getDataByFilter: getDataByFilter,
    };

    return <WrappedComponent {...listProps} />;
};
