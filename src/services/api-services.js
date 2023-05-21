import itemServices from './item-api-services';
import inputServices from './input-api-service';
import outputServices from './output-api-service';
import warehouseServices from './warehouse-api-service';
import salesReturnServices from './sales-return-api-service';
import purchaseReturnServices from './purchase-return-api-service';
import { isInputDocument, isOutputDocument, isDispatchDocument } from '@utils';

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

const findReceptionDocumentByFilter = async (type, filter) => {
    const response = isInputDocument(type)
        ? await inputServices.findReceptionInputDocumentByFilter(filter)
        : await salesReturnServices.findReceptionSalesReturnDocumentByFilter(filter);

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
    putItem: itemServices.putItem,
    findReceptionDocumentByFilter,
    findAllDispatchDocumentAsPage,
    findAllDispatchDocumentByPage,
    findAllReceptionDocumentAsPage,
    findAllReceptionDocumentByPage,
    postItem: itemServices.postItem,
    findItemById: itemServices.findItemById,
    findAllItemsByPage: itemServices.findAllItemsByPage,
    findAllItemsAsPage: itemServices.findAllItemsAsPage,
    findAllWarehousesAsOption: warehouseServices.findAllWarehousesAsOption,
};

export default services;
