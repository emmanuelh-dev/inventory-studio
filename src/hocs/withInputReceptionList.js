import { MESSAGES } from '@messages';
import services from '@services/api-services';
import { useNotification } from '@hooks/useNotification';
import { DOCUMENT_TYPES, MESSAGE_TYPES } from '@constants';
import { documentSearchFields, documentFilters } from '@constants/options';

export const withInputReceptionList = (WrappedComponent) => {
    const WithInputReceptionList = () => {
        const { notification, showNotification } = useNotification();
        const getDataAsPage = async () => {
            const result = await services.findAllReceptionDocumentAsPage(DOCUMENT_TYPES.INPUT);
            return result;
        };

        const getDataByPage = async (page) => {
            const result = await services.findAllReceptionDocumentByPage(
                DOCUMENT_TYPES.INPUT,
                page
            );
            return result;
        };

        const getDataByFilter = async (filter) => {
            const result = await services.findReceptionDocumentByFilter(
                DOCUMENT_TYPES.INPUT,
                filter
            );
            return result;
        };

        const removeDocument = async (document) => {
            try {
                await services.deleteReceptionDocument(document);
                showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
                window.location.reload(false);
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
            redirect: 'reception/INPUT/id/',
            getDataByFilter: getDataByFilter,
            header: MESSAGES.DOCUMENT_DELETE_CONFIRMATION,
        };

        return <WrappedComponent {...listProps} />;
    };

    return WithInputReceptionList;
};
