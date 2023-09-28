import { MESSAGES } from '@messages';
import services from '@services/api-services';
import { useNotification } from '@hooks/useNotification';
import { DOCUMENT_TYPES, MESSAGE_TYPES } from '@constants';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withPurchaseReturnDispatchList = (WrappedComponent) => {
    const WithPurchaseReturnDispatchList = () => {
        const { notification, showNotification } = useNotification();
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

        const removeDocument = async (document) => {
            try {
                await services.deleteDispatchDocument(document);
                showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
            } catch (error) {
                showNotification(MESSAGE_TYPES.ERROR, error.message);
            }
        };

        const listProps = {
            notification,
            remove: removeDocument,
            filters: documentFilters,
            fields: documentSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            getDataByFilter: getDataByFilter,
            redirect: 'dispatch/PURCHASE_RETURN/id/',
            header: MESSAGES.DOCUMENT_DELETE_CONFIRMATION,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithPurchaseReturnDispatchList;
};
