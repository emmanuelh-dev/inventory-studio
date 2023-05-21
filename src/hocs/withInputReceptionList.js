import { DOCUMENT_TYPES } from '@constants';
import { documentSearchFields, documentFilters } from '@constants/options';
import services from '@services/api-services';
export const withInputReceptionList = (WrappedComponent) => (props) => {
    // const endpoint = {
    //     redirect: 'reception/INPUT/id/',
    //     search: process.env.NEXT_PUBLIC_RECEPTIONS_SEARCH,
    //     suggestions: process.env.NEXT_PUBLIC_IN_RECEPTIONS_SUGGESTIONS,
    // };

    const getDataAsPage = async () => {
        const result = await services.findAllReceptionDocumentAsPage(DOCUMENT_TYPES.INPUT);
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllReceptionDocumentByPage(DOCUMENT_TYPES.INPUT, page);
        return result;
    };

    const getDataByFilter = async (filter) => {
        const result = await services.findReceptionDocumentFilteredBy(DOCUMENT_TYPES.INPUT, filter);
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
