import services from '@services/api-services';
import { itemSearchFields, itemFilters } from '@constants/options';

export const withItemList = (WrappedComponent) => (props) => {
    const getDataAsPage = async () => {
        const result = await services.findAllItemsAsPage();
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllItemsByPage(page);
        return result;
    };

    const getDataByFilter = async (filter) => {
        const result = await services.findItemByFilter(filter);
        return result;
    };

    const listProps = {
        redirect: 'item/',
        filters: itemFilters,
        fields: itemSearchFields,
        getDataAsPage: getDataAsPage,
        getDataByPage: getDataByPage,
        getDataByFilter: getDataByFilter,
    };

    return <WrappedComponent {...listProps} />;
};
