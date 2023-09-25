import services from '@services/api-services';
import { ListToolbar } from '@components/listtoolbar';
import { itemSearchFields, itemFilters } from '@constants/options';

export const withItemList = (WrappedComponent) => {
    const WithItemList = (props) => {
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

        const toolbar = <ListToolbar creationPath="item" />;

        const listProps = {
            toolbar,
            redirect: 'item/',
            filters: itemFilters,
            fields: itemSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            getDataByFilter: getDataByFilter,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithItemList;
};
