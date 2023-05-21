import { DOCUMENT_TYPES } from '@constants';
import services from '@services/api-services';
import { documentSearchFields, documentFilters } from '@constants/options';
export const withInputReceptionList = (WrappedComponent) => (props) => {
    const getDataAsPage = async () => {
        const result = await services.findAllReceptionDocumentAsPage(DOCUMENT_TYPES.INPUT);
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllReceptionDocumentByPage(DOCUMENT_TYPES.INPUT, page);
        return result;
    };

    const getDataByFilter = async (filter) => {
        const result = await services.findReceptionDocumentByFilter(DOCUMENT_TYPES.INPUT, filter);
        return result;
    };

    const listProps = {
        filters: documentFilters,
        type: DOCUMENT_TYPES.INPUT,
        fields: documentSearchFields,
        getDataAsPage: getDataAsPage,
        getDataByPage: getDataByPage,
        redirect: 'reception/INPUT/id/',
        getDataByFilter: getDataByFilter,
    };

    return <WrappedComponent {...listProps} />;
};
