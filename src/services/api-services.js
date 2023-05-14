import itemServices, { setItemSession } from './item-api-services';
import outputServices, { setOutputDocumentSession } from './output-api-service';
import warehouseServices, { setWarehouseSession } from './warehouse-api-services';
import purchaseReturnServices, {
    setPurchaseReturnDocumentSession,
} from './purchase-return-api-service';

export const setSession = (session) => {
    setItemSession(session);
    setWarehouseSession(session);
    setOutputDocumentSession(session);
    setPurchaseReturnDocumentSession(session);
};

const findDispatchDocumentById = async (type, id) => {
    const response =
        type === 'OUTPUT'
            ? await outputServices.findDispatchOutputDocumentById(id)
            : await purchaseReturnServices.findDispatchPurchaseReturnDocumentById(id);

    return response;
};

const findAllDispatchDocumentByPage = async (type, page) => {
    const response =
        type === 'OUTPUT'
            ? await outputServices.findAllDispatchOutputDocumentByPage(page)
            : await purchaseReturnServices.findAllDispatchPurchaseReturnDocumentByPage(page);

    return response;
};

const findAllDispatchDocumentAsPage = async (type) => {
    const response =
        type === 'OUTPUT'
            ? await outputServices.findAllDispatchOutputDocumentAsPage()
            : await purchaseReturnServices.findAllDispatchPurchaseReturnDocumentAsPage();

    return response;
};

const postDispatchDocument = async (document) => {
    const response =
        document.type === 'OUTPUT'
            ? await outputServices.postDispatchOutputDocument(document)
            : await purchaseReturnServices.postDispatchPurchaseReturnDocument(document);

    return response;
};

const putDispatchDocument = async (document) => {
    const response =
        document.type === 'OUTPUT'
            ? await outputServices.putDispatchOutputDocument(document)
            : await purchaseReturnServices.putDispatchPurchaseReturnDocument(document);

    return response;
};

const releaseDispatchDocument = async (document) => {
    const response =
        document.type === 'OUTPUT'
            ? await outputServices.releaseDispatchOutputDocument(document.id)
            : await purchaseReturnServices.releaseDispatchPurchaseReturnDocument(document.id);

    return response;
};

const deleteDispatchDocument = async (document) => {
    const response =
        document.type === 'OUTPUT'
            ? await outputServices.deleteDispatchOutputDocument(document.id)
            : await purchaseReturnServices.deleteDispatchPurchaseReturnDocument(document.id);

    return response;
};

const services = {
    putDispatchDocument,
    postDispatchDocument,
    deleteDispatchDocument,
    releaseDispatchDocument,
    findDispatchDocumentById,
    findAllDispatchDocumentAsPage,
    findAllDispatchDocumentByPage,
    findAllItemsAsOption: itemServices.findAllItemsAsOption,
    findAllWarehousesAsOption: warehouseServices.findAllWarehousesAsOption,
};

export default services;
