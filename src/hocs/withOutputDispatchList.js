import { DOCUMENT_TYPES } from '@constants';
import services from '@services/api-services';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withOutputDispatchList = (WrappedComponent) => (props) => {
    const getDataAsPage = async () => {
        const result = await services.findAllDispatchDocumentAsPage(DOCUMENT_TYPES.OUTPUT);
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllDispatchDocumentByPage(DOCUMENT_TYPES.OUTPUT, page);
        return result;
    };

    const getDataByFilter = async (filter) => {
        const result = await services.findDispatchDocumentByFilter(DOCUMENT_TYPES.OUTPUT, filter);
        return result;
    };

    const listProps = {
        filters: documentFilters,
        type: DOCUMENT_TYPES.INPUT,
        fields: documentSearchFields,
        getDataAsPage: getDataAsPage,
        getDataByPage: getDataByPage,
        redirect: 'dispatch/OUTPUT/id/',
        getDataByFilter: getDataByFilter,
    };

    return <WrappedComponent {...listProps} />;
};
