import { MESSAGES } from '@messages';
import services from '@services/api-services';
import { useNotification } from '@hooks/useNotification';
import { DOCUMENT_TYPES, MESSAGE_TYPES } from '@constants';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withOutputDispatchList = (WrappedComponent) => {
    const WithOutputDispatchList = () => {
        const { notification, showNotification } = useNotification();
        const getDataAsPage = async () => {
            const result = await services.findAllDispatchDocumentAsPage(DOCUMENT_TYPES.OUTPUT);
            return result;
        };

        const getDataByPage = async (page) => {
            const result = await services.findAllDispatchDocumentByPage(
                DOCUMENT_TYPES.OUTPUT,
                page
            );
            return result;
        };

        const getDataByFilter = async (filter) => {
            const result = await services.findDispatchDocumentByFilter(
                DOCUMENT_TYPES.OUTPUT,
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
            headerValue: 'id',
            remove: removeDocument,
            filters: documentFilters,
            fields: documentSearchFields,
            getDataAsPage: getDataAsPage,
            getDataByPage: getDataByPage,
            redirect: 'dispatch/OUTPUT/id/',
            getDataByFilter: getDataByFilter,
            header: MESSAGES.DOCUMENT_DELETE_CONFIRMATION,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithOutputDispatchList;
};
