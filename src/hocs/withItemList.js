import { MESSAGES } from '@messages';
import { MESSAGE_TYPES } from '@constants';
import services from '@services/api-services';
import { ListToolbar } from '@components/listtoolbar';
import { useNotification } from '@hooks/useNotification';
import { itemSearchFields, itemFilters } from '@constants/options';

export const withItemList = (WrappedComponent) => {
    const WithItemList = (props) => {
        const { notification, showNotification } = useNotification();
        const getDataAsPage = async () => {
            const result = await services.findAllItemsAsPage();
            return result;
        };

        const getDataByPage = async (page) => {
            const result = await services.findAllItemsByPage(page);
            return result;
        };

        const getDataByFilter = async (filter) => {
            const result = await services.findItemsByFilter(filter);
            return result;
        };

        const removeItem = async (item) => {
            try {
                await services.deleteItem(item.id);
                showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
            } catch (error) {
                showNotification(MESSAGE_TYPES.ERROR, error.message);
            }
        };

        const toolbar = <ListToolbar creationPath="item" />;

        const listProps = {
            toolbar,
            notification,
            redirect: 'item/',
            remove: removeItem,
            filters: itemFilters,
            headerValue: 'itemName',
            fields: itemSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            getDataByFilter: getDataByFilter,
            header: MESSAGES.ITEM_DELETE_CONFIRMATION,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithItemList;
};
