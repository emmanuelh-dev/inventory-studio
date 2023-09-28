import { MESSAGES } from '@messages';
import services from '@services/api-services';
import { useNotification } from '@hooks/useNotification';
import { DOCUMENT_TYPES, MESSAGE_TYPES } from '@constants';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withSalesReturnReceptionList = (WrappedComponent) => {
    const WithSalesReturnReceptionList = () => {
        const { notification, showNotification } = useNotification();

        const getDataAsPage = async () => {
            const result = await services.findAllReceptionDocumentAsPage(
                DOCUMENT_TYPES.SALES_RETURN
            );
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

        const removeDocument = async (document) => {
            try {
                await services.deleteReceptionDocument(document);
                showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
            } catch (error) {
                showNotification(MESSAGE_TYPES.ERROR, error.message);
            }
        };

        const listProps = {
            notification,
            headerValue: 'id',
            remove: removeDocument,
            filters: documentFilters,
            fields: documentSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            getDataByFilter: getDataByFilter,
            redirect: 'reception/SALES_RETURN/id/',
            header: MESSAGES.DOCUMENT_DELETE_CONFIRMATION,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithSalesReturnReceptionList;
};
