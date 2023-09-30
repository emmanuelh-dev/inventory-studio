import { MESSAGES } from '@messages';
import { MESSAGE_TYPES } from '@constants';
import services from '@services/api-services';
import { ListToolbar } from '@components/listtoolbar';
import { useNotification } from '@hooks/useNotification';
import { warehouseSearchFields, warehouseFilters } from '@constants/options';

export const withWarehouseList = (WrappedComponent) => {
    const WithWarehouseList = () => {
        const { notification, showNotification } = useNotification();
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

        const removeWarehouse = async (warehouse) => {
            try {
                await services.deleteWarehouse(warehouse.id);
                showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
            } catch (error) {
                showNotification(MESSAGE_TYPES.ERROR, error.message);
            }
        };

        const toolbar = <ListToolbar creationPath="warehouse" />;

        const listProps = {
            toolbar,
            notification,
            redirect: 'warehouse/',
            remove: removeWarehouse,
            filters: warehouseFilters,
            headerValue: 'warehouseName',
            fields: warehouseSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            getDataByFilter: getDataByFilter,
            header: MESSAGES.WAREHOUSE_DELETE_CONFIRMATION,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithWarehouseList;
};
