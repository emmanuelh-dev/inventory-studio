import { DOCUMENT_TYPES } from '@constants';
import services from '@services/api-services';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withPurchaseReturnDispatchList = (WrappedComponent) => {
    const WithPurchaseReturnDispatchList = () => {
        const getDataAsPage = async () => {
            const result = await services.findAllDispatchDocumentAsPage(
                DOCUMENT_TYPES.PURCHASE_RETURN
            );
            return result;
        };

        const getDataByPage = async (page) => {
            const result = await services.findAllDispatchDocumentByPage(
                DOCUMENT_TYPES.PURCHASE_RETURN,
                page
            );
            return result;
        };

        const getDataByFilter = async (filter) => {
            const result = await services.findDispatchDocumentByFilter(
                DOCUMENT_TYPES.PURCHASE_RETURN,
                filter
            );
            return result;
        };

        const listProps = {
            filters: documentFilters,
            fields: documentSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            getDataByFilter: getDataByFilter,
            redirect: 'dispatch/PURCHASE_RETURN/id/',
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithPurchaseReturnDispatchList;
};
