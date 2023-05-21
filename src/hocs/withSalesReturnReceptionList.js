import { DOCUMENT_TYPES } from '@constants';
import services from '@services/api-services';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withSalesReturnReceptionList = (WrappedComponent) => (props) => {
    const getDataAsPage = async () => {
        const result = await services.findAllReceptionDocumentAsPage(DOCUMENT_TYPES.SALES_RETURN);
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllReceptionDocumentByPage(
            DOCUMENT_TYPES.SALES_RETURN,
            page
        );
        return result;
    };

    const getDataByFilter = async (filter) => {
        const result = await services.findReceptionDocumentByFilter(
            DOCUMENT_TYPES.SALES_RETURN,
            filter
        );
        return result;
    };

    const listProps = {
        filters: documentFilters,
        fields: documentSearchFields,
        getDataAsPage: getDataAsPage,
        getDataByPage: getDataByPage,
        redirect: 'reception/SALES_RETURN/id/',
        getDataByFilter: getDataByFilter,
    };

    return <WrappedComponent {...listProps} />;
};
