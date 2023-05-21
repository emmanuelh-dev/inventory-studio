import itemServices, { setItemSession } from './item-api-services';
import inputServices, { setInputDocumentSession } from './input-api-service';
import { isInputDocument, isOutputDocument, isDispatchDocument } from '@utils';
import outputServices, { setOutputDocumentSession } from './output-api-service';
import warehouseServices, { setWarehouseSession } from './warehouse-api-service';
import purchaseReturnServices, {
    setPurchaseReturnDocumentSession,
} from './purchase-return-api-service';
import salesReturnServices, { setSalesReturnDocumentSession } from './sales-return-api-service';

export const setSession = (session) => {
    setItemSession(session);
    setWarehouseSession(session);
    setInputDocumentSession(session);
    setOutputDocumentSession(session);
    setSalesReturnDocumentSession(session);
    setPurchaseReturnDocumentSession(session);
};

const findDispatchDocumentById = async (type, id) => {
    const response = isOutputDocument(type)
        ? await outputServices.findDispatchOutputDocumentById(id)
        : await purchaseReturnServices.findDispatchPurchaseReturnDocumentById(id);

    return response;
};

const findAllDispatchDocumentByPage = async (type, page) => {
    const response = isOutputDocument(type)
        ? await outputServices.findAllDispatchOutputDocumentByPage(page)
        : await purchaseReturnServices.findAllDispatchPurchaseReturnDocumentByPage(page);

    return response;
};

const findAllDispatchDocumentAsPage = async (type) => {
    const response = isOutputDocument(type)
        ? await outputServices.findAllDispatchOutputDocumentAsPage()
        : await purchaseReturnServices.findAllDispatchPurchaseReturnDocumentAsPage();

    return response;
};

const postDispatchDocument = async (document) => {
    const response = isOutputDocument(document.type)
        ? await outputServices.postDispatchOutputDocument(document)
        : await purchaseReturnServices.postDispatchPurchaseReturnDocument(document);

    return response;
};

const putDispatchDocument = async (document) => {
    const response = isOutputDocument(document.type)
        ? await outputServices.putDispatchOutputDocument(document)
        : await purchaseReturnServices.putDispatchPurchaseReturnDocument(document);

    return response;
};

const releaseDispatchDocument = async (document) => {
    const response = isOutputDocument(document.type)
        ? await outputServices.releaseDispatchOutputDocument(document.id)
        : await purchaseReturnServices.releaseDispatchPurchaseReturnDocument(document.id);

    return response;
};

const deleteDispatchDocument = async (document) => {
    const response = isOutputDocument(document.type)
        ? await outputServices.deleteDispatchOutputDocument(document.id)
        : await purchaseReturnServices.deleteDispatchPurchaseReturnDocument(document.id);

    return response;
};

const findAllItemsAsOption = async (type, warehouse) => {
    const response = isDispatchDocument(type)
        ? await itemServices.findAllItemsAsOptionForDistpatchDocument(warehouse)
        : await itemServices.findAllItemsAsOptionForReceptionDocument();

    return response;
};

//Reception

const findReceptionDocumentById = async (type, id) => {
    const response = isInputDocument(type)
        ? await inputServices.findReceptionInputDocumentById(id)
        : await salesReturnServices.findReceptionSalesReturnDocumentById(id);

    return response;
};

const findAllReceptionDocumentByPage = async (type, page) => {
    const response = isInputDocument(type)
        ? await inputServices.findAllReceptionInputDocumentByPage(page)
        : await salesReturnServices.findAllReceptionSalesReturnDocumentByPage(page);

    return response;
};

const findAllReceptionDocumentAsPage = async (type) => {
    const response = isInputDocument(type)
        ? await inputServices.findAllReceptionInputDocumentAsPage()
        : await salesReturnServices.findAllReceptionSalesReturnDocumentAsPage();

    return response;
};

const findReceptionDocumentFilteredBy = async (type, filter) => {
    const response = isInputDocument(type)
        ? await inputServices.findReceptionInputDocumentFilteredBy(filter)
        : await salesReturnServices.findReceptionSalesReturnDocumentById(filter);

    return response;
};

const postReceptionDocument = async (document) => {
    const response = isInputDocument(document.type)
        ? await inputServices.postReceptionInputDocument(document)
        : await salesReturnServices.postReceptionSalesReturnDocument(document);

    return response;
};

const putReceptionDocument = async (document) => {
    const response = isInputDocument(document.type)
        ? await inputServices.putReceptionInputDocument(document)
        : await salesReturnServices.putReceptionSalesReturnDocument(document);

    return response;
};

const releaseReceptionDocument = async (document) => {
    const response = isInputDocument(document.type)
        ? await inputServices.releaseReceptionInputDocument(document.id)
        : await salesReturnServices.releaseReceptionSalesReturnDocument(document.id);

    return response;
};

const deleteReceptionDocument = async (document) => {
    const response = isInputDocument(document.type)
        ? await inputServices.deleteReceptionInputDocument(document.id)
        : await salesReturnServices.deleteReceptionSalesReturnDocument(document.id);

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
    findReceptionDocumentFilteredBy,
    findAllWarehousesAsOption: warehouseServices.findAllWarehousesAsOption,
};

export default services;
