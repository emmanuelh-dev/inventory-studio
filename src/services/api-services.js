import itemServices, { setItemSession } from './item-api-services';
import inputServices, { setInputDocumentSession } from './input-api-service';
import outputServices, { setOutputDocumentSession } from './output-api-service';
import warehouseServices, { setWarehouseSession } from './warehouse-api-service';
import purchaseReturnServices, {
    setPurchaseReturnDocumentSession,
} from './purchase-return-api-service';

export const setSession = (session) => {
    setItemSession(session);
    setWarehouseSession(session);
    setInputDocumentSession(session);
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

const findAllItemsAsOption = async (type, warehouse) => {
    const response =
        type === 'OUTPUT' || type === 'PURCHASE_RETURN'
            ? await itemServices.findAllItemsAsOptionForDistpatchDocument(warehouse)
            : await itemServices.findAllItemsAsOptionForReceptionDocument();

    return response;
};

//Reception

const findReceptionDocumentById = async (type, id) => {
    const response =
        type === 'INPUT'
            ? await inputServices.findReceptionInputDocumentById(id)
            : await purchaseReturnServices.findDispatchPurchaseReturnDocumentById(id);

    return response;
};

const findAllReceptionDocumentByPage = async (type, page) => {
    const response =
        type === 'INPUT'
            ? await inputServices.findAllReceptionInputDocumentByPage(page)
            : await purchaseReturnServices.findAllDispatchPurchaseReturnDocumentByPage(page);

    return response;
};

const findAllReceptionDocumentAsPage = async (type) => {
    const response =
        type === 'INPUT'
            ? await inputServices.findAllReceptionInputDocumentAsPage()
            : await purchaseReturnServices.findAllDispatchPurchaseReturnDocumentAsPage();

    return response;
};

const postReceptionDocument = async (document) => {
    const response =
        document.type === 'INPUT'
            ? await inputServices.postReceptionInputDocument(document)
            : await purchaseReturnServices.postDispatchPurchaseReturnDocument(document);

    return response;
};

const putReceptionDocument = async (document) => {
    const response =
        document.type === 'INPUT'
            ? await inputServices.putReceptionInputDocument(document)
            : await purchaseReturnServices.putDispatchPurchaseReturnDocument(document);

    return response;
};

const releaseReceptionDocument = async (document) => {
    const response =
        document.type === 'INPUT'
            ? await inputServices.releaseReceptionInputDocument(document.id)
            : await purchaseReturnServices.releaseDispatchPurchaseReturnDocument(document.id);

    return response;
};

const deleteReceptionDocument = async (document) => {
    const response =
        document.type === 'INPUT'
            ? await inputServices.deleteReceptionInputDocument(document.id)
            : await purchaseReturnServices.deleteDispatchPurchaseReturnDocument(document.id);

    return response;
};

const services = {
    putDispatchDocument,
    postDispatchDocument,
    putReceptionDocument,
    findAllItemsAsOption,
    postReceptionDocument,
    deleteDispatchDocument,
    deleteReceptionDocument,
    releaseDispatchDocument,
    findDispatchDocumentById,
    releaseReceptionDocument,
    findReceptionDocumentById,
    findAllDispatchDocumentAsPage,
    findAllDispatchDocumentByPage,
    findAllReceptionDocumentAsPage,
    findAllReceptionDocumentByPage,
    findAllWarehousesAsOption: warehouseServices.findAllWarehousesAsOption,
};

export default services;
