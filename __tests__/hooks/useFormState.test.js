import _ from 'lodash';
import { stringToDate } from '@utils';
import { renderHook, act } from '@testing-library/react';
import { useDetail, useDocumentForm } from '@hooks/useFormState';
import {
    DOCUMENT_TYPES,
    inputDocumentState,
    outputDocumentState,
    purchaseReturnDocumentState,
} from '@constants';

describe('useFormState', () => {
    describe('useDocumentForm', () => {
        describe('dispatch document', () => {
            const warehouse = {
                id: 1,
                warehouseName: 'warehouse one',
                itemSummary: [],
                used: false,
                deleted: false,
            };

            const detailOne = {
                id: 1,
                lineNumber: 1,
                item: {
                    id: 1,
                    itemName: 'item one',
                    description: 'item description one',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item one',
                quantity: 5,
                unitPrice: 10,
                totalPrice: 50,
                deleted: false,
            };

            const detailTwo = {
                id: 2,
                lineNumber: 2,
                item: {
                    id: 2,
                    itemName: 'item two',
                    description: 'item description two',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item two',
                quantity: 2,
                unitPrice: 25,
                totalPrice: 50,
                deleted: false,
            };

            const initialDocument = {
                id: 'OU0000000001',
                type: 'OUTPUT',
                date: new Date(),
                status: 'OPEN',
                warehouse: warehouse,
                description: 'output document one',
                totalQuantity: 10,
                totalAmount: 100,
                counter: 2,
                deleted: false,
                details: [detailOne, detailTwo],
            };

            it('should be able to init the hook with default initial state value for output document', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: undefined,
                        defaultInitialState: outputDocumentState,
                    },
                });

                expect(result.current.addButtonDisabled).toBe(true);
                expect(result.current.saveButtonDisabled).toBe(true);
                expect(result.current.deleteButtonDisabled).toBe(true);
                expect(result.current.releaseButtonDisabled).toBe(true);
                expect(result.current.document).toEqual(outputDocumentState);
                expect(result.current.documentCopy).toEqual(outputDocumentState);
                expect(result.current.initialDocument).toEqual(outputDocumentState);
            });

            it('should be able to init the hook with initial state value for output document', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                expect(result.current.addButtonDisabled).toBe(false);
                expect(result.current.saveButtonDisabled).toBe(true);
                expect(result.current.deleteButtonDisabled).toBe(false);
                expect(result.current.releaseButtonDisabled).toBe(false);
                expect(result.current.document).toEqual(initialDocument);
                expect(result.current.documentCopy).toEqual(initialDocument);
                expect(result.current.initialDocument).toEqual(outputDocumentState);
            });

            it('should be able to update document fields', () => {
                const warehouseUpdated = {
                    id: 10,
                    warehouseName: 'warehouse ten',
                    itemSummary: [],
                    used: false,
                    deleted: false,
                };

                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentField('status', 'RELEASED');
                });

                act(() => {
                    result.current.updateDocumentField('description', 'output description changed');
                });

                act(() => {
                    result.current.updateDocumentField('totalQuantity', 20);
                });

                act(() => {
                    result.current.updateDocumentField('totalAmount', 200);
                });

                act(() => {
                    result.current.updateDocumentField('warehouse', warehouseUpdated);
                });

                expect(result.current.document.status).toBe('RELEASED');
                expect(result.current.document.description).toBe('output description changed');
                expect(result.current.document.totalQuantity).toBe(20);
                expect(result.current.document.totalAmount).toBe(200);
                expect(result.current.document.warehouse).toBe(warehouseUpdated);
            });

            it('should be able to add document detail element', () => {
                const detailThree = {
                    id: 3,
                    lineNumber: 3,
                    item: {
                        id: 3,
                        itemName: 'item three',
                        description: 'item description three',
                        valuationType: 'AVERAGE',
                        used: false,
                    },
                    description: 'detail item three',
                    quantity: 5,
                    unitPrice: 8,
                    totalPrice: 40,
                    deleted: false,
                };

                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                const details = [...result.current.document.details, detailThree];

                act(() => {
                    result.current.updateDocumentField('details', details);
                });

                expect(result.current.document.details).toEqual(details);
                expect(result.current.document.details.length).toBe(3);
            });

            it('should be able to remove document detail element', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                const details = result.current.document.details.pop();
                act(() => {
                    result.current.updateDocumentField('details', [details]);
                });

                expect(result.current.document.details).toEqual([detailTwo]);
                expect(result.current.document.details.length).toBe(1);
            });

            it('should be able to update document detail element', () => {
                const detailOneUpdated = {
                    ..._.cloneDeep(detailOne),
                    item: {
                        id: 3,
                        itemName: 'item three',
                        description: 'item description three',
                        valuationType: 'AVERAGE',
                        used: false,
                    },
                    description: 'detail item one updated',
                    quantity: 3,
                    unitPrice: 8,
                    totalPrice: 24,
                };

                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                const details = [...result.current.document.details];

                details[0] = detailOneUpdated;
                act(() => {
                    result.current.updateDocumentField('details', details);
                });

                expect(result.current.document.details).toEqual([detailOneUpdated, detailTwo]);
                expect(result.current.document.details.length).toBe(2);
            });

            it('should be able to update the document', () => {
                const document = {
                    ..._.cloneDeep(initialDocument),
                    status: 'RELEASED',
                    description: 'output document description one',
                    totalQuantity: 10,
                    totalAmount: 1000,
                    counter: 6,
                    details: [detailOne],
                };

                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocument(document);
                });

                expect(result.current.document).toBe(document);
            });

            it('should be able to update document copy', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentCopy(purchaseReturnDocumentState);
                });

                expect(result.current.documentCopy).toBe(purchaseReturnDocumentState);
            });

            it('should be able to clear document', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentField('description', 'output description changed');
                });

                act(() => {
                    result.current.clearDocument();
                });

                expect(result.current.document).toEqual(_.cloneDeep(outputDocumentState));
                expect(result.current.documentCopy).toEqual(_.cloneDeep(outputDocumentState));
            });

            it('should be able to update document when get an updating from service', () => {
                const documentFromService = _.cloneDeep(initialDocument);
                documentFromService.date = '03-07-2023 23:41:50.000';
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentFromService(documentFromService);
                });

                const documentResult = stringToDate(_.cloneDeep(documentFromService));
                expect(result.current.document).toEqual(_.cloneDeep(documentResult));
            });

            it('should be able to update initial document', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateInitialDocument(DOCUMENT_TYPES.PURCHASE_RETURN);
                });

                const expected = _.cloneDeep(purchaseReturnDocumentState);

                expect(result.current.document).toEqual(expected);
                expect(result.current.documentCopy).toEqual(expected);
                expect(result.current.initialDocument).toEqual(expected);
            });

            it('should enable add button', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: undefined,
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentField('warehouse', warehouse);
                });

                expect(result.current.addButtonDisabled).toBe(false);
                expect(result.current.document.warehouse).toEqual(warehouse);
            });

            it('should enable save button', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentField('description', 'output description changed');
                });

                expect(result.current.saveButtonDisabled).toBe(false);
            });

            it('should enable delete button', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                expect(result.current.deleteButtonDisabled).toBe(false);
            });

            it('should disable delete button when any field of document is updated', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentField('description', 'output description changed');
                });

                expect(result.current.deleteButtonDisabled).toBe(true);
            });

            it('should disable delete button when document type is changed', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateInitialDocument(DOCUMENT_TYPES.PURCHASE_RETURN);
                });

                expect(result.current.deleteButtonDisabled).toBe(true);
            });

            it('should enable release button', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                expect(result.current.releaseButtonDisabled).toBe(false);
            });

            it('should disable release button when any field of document is updated', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateDocumentField('description', 'output description changed');
                });

                expect(result.current.releaseButtonDisabled).toBe(true);
            });

            it('should disable release button when document type is changed', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });

                act(() => {
                    result.current.updateInitialDocument(DOCUMENT_TYPES.PURCHASE_RETURN);
                });

                expect(result.current.releaseButtonDisabled).toBe(true);
            });
        });
    });

    describe('useDetail', () => {
        const detailOne = {
            id: null,
            lineNumber: 0,
            item: {
                id: 1,
                itemName: 'item one',
                description: 'item description one',
                valuationType: 'AVERAGE',
                used: false,
            },
            description: 'detail item one',
            quantity: 5,
            unitPrice: 10,
            totalPrice: 50,
            deleted: false,
        };

        const detailTwo = {
            id: null,
            lineNumber: 0,
            item: {
                id: 2,
                itemName: 'item two',
                description: 'item description two',
                valuationType: 'AVERAGE',
                used: false,
            },
            description: 'detail item two',
            quantity: 3,
            unitPrice: 8,
            totalPrice: 24,
            deleted: false,
        };

        const detailThree = {
            id: null,
            lineNumber: 0,
            item: {
                id: 3,
                itemName: 'item three',
                description: 'item description three',
                valuationType: 'AVERAGE',
                used: false,
            },
            description: 'detail item three',
            quantity: 5,
            unitPrice: 8,
            totalPrice: 40,
            deleted: false,
        };

        it('should initialize line counter by default with one', () => {
            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialAmount: undefined,
                    initialCounter: undefined,
                    initialDetails: undefined,
                    initialQuantity: undefined,
                },
            });

            expect(result.current.rows).toEqual([]);
            expect(result.current.lineCounter).toBe(1);
            expect(result.current.totalAmount).toBe(0);
            expect(result.current.totalQuantity).toBe(0);
        });

        it('should initialize line counter with a value', () => {
            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: 10,
                    initialDetails: undefined,
                },
            });

            expect(result.current.lineCounter).toBe(10);
        });

        it('should initialize rows with a value', () => {
            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialAmount: 0,
                    initialQuantity: 0,
                    initialCounter: 10,
                    initialDetails: [
                        _.cloneDeep(detailOne),
                        _.cloneDeep(detailTwo),
                        _.cloneDeep(detailThree),
                    ],
                },
            });

            expect(result.current.lineCounter).toBe(10);
            expect(result.current.totalAmount).toBe(114);
            expect(result.current.totalQuantity).toBe(13);
            expect(result.current.rows).toEqual([detailOne, detailTwo, detailThree]);
        });

        it('should increment line counter by one', () => {
            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialAmount: undefined,
                    initialCounter: undefined,
                    initialDetails: undefined,
                    initialQuantity: undefined,
                },
            });

            act(() => {
                result.current.incrementLineCounter();
            });

            expect(result.current.lineCounter).toBe(2);
        });

        it('should create a new row start with one', () => {
            const detailTwo = _.cloneDeep(detailOne);
            detailTwo.lineNumber = 1;

            let row = null;

            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialAmount: undefined,
                    initialCounter: undefined,
                    initialDetails: undefined,
                    initialQuantity: undefined,
                },
            });

            act(() => {
                row = result.current.createDetail(detailOne);
            });

            expect(row).toEqual(detailTwo);
            expect(result.current.lineCounter).toBe(1);
        });

        it('should add new detail', () => {
            const expectedDetail = _.cloneDeep(detailOne);
            expectedDetail.lineNumber = 1;

            let detail = null;

            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialAmount: undefined,
                    initialCounter: undefined,
                    initialDetails: undefined,
                    initialQuantity: undefined,
                },
            });

            act(() => {
                detail = result.current.createDetail(detailOne);
            });

            act(() => {
                result.current.addDetail(detail);
            });

            expect(result.current.lineCounter).toBe(2);
            expect(result.current.rows).toEqual([expectedDetail]);
        });

        it('should update details', () => {
            const detailFour = {
                id: 2,
                lineNumber: 2,
                item: {
                    id: 2,
                    itemName: 'item two',
                    description: 'item description two',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item two updated',
                quantity: 10,
                unitPrice: 10,
                totalPrice: 100,
                deleted: false,
            };

            const details = [detailOne, detailFour, detailThree];

            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: 3,
                    initialDetails: [detailOne, detailTwo, detailThree],
                },
            });

            act(() => {
                result.current.updateDetails(detailFour);
            });

            expect(result.current.lineCounter).toBe(3);
            expect(result.current.totalAmount).toBe(190);
            expect(result.current.totalQuantity).toBe(20);

            expect(result.current.rows).toEqual(details);
            expect(result.current.rows[1]).toEqual(detailFour);
        });

        it('should mark two elements as deleted', () => {
            const storedDetailOne = _.cloneDeep(detailOne);
            const storedDetailTwo = _.cloneDeep(detailTwo);
            const storedDetailThree = _.cloneDeep(detailThree);

            storedDetailOne.id = 1;
            storedDetailOne.lineNumber = 1;

            storedDetailTwo.id = 2;
            storedDetailTwo.lineNumber = 2;

            storedDetailThree.id = 3;
            storedDetailThree.lineNumber = 3;

            const selection = [storedDetailOne, storedDetailThree];

            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: 3,
                    initialAmount: 114,
                    initialQuantity: 13,
                    initialDetails: [storedDetailOne, storedDetailTwo, storedDetailThree],
                },
            });

            act(() => {
                result.current.removeDetails(selection);
            });

            expect(result.current.rows.length).toBe(3);
            expect(result.current.lineCounter).toBe(3);
            expect(result.current.totalAmount).toBe(24);
            expect(result.current.totalQuantity).toBe(3);
            expect(result.current.rows[0].deleted).toBe(true);
            expect(result.current.rows[1].deleted).toBe(false);
            expect(result.current.rows[2].deleted).toBe(true);
        });

        it('should mark nonone element as deleted', () => {
            const storedDetailOne = _.cloneDeep(detailOne);
            const storedDetailTwo = _.cloneDeep(detailTwo);
            const storedDetailThree = _.cloneDeep(detailThree);

            storedDetailOne.id = 1;
            storedDetailOne.lineNumber = 1;

            storedDetailTwo.id = 2;
            storedDetailTwo.lineNumber = 2;

            storedDetailThree.id = 3;
            storedDetailThree.lineNumber = 3;

            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: 3,
                    initialAmount: 114,
                    initialQuantity: 13,
                    initialDetails: [storedDetailOne, storedDetailTwo, storedDetailThree],
                },
            });

            act(() => {
                result.current.removeDetails([]);
            });

            expect(result.current.rows.length).toBe(3);
            expect(result.current.lineCounter).toBe(3);
            expect(result.current.totalAmount).toBe(114);
            expect(result.current.totalQuantity).toBe(13);

            expect(result.current.rows[0].deleted).toBe(false);
            expect(result.current.rows[1].deleted).toBe(false);
            expect(result.current.rows[2].deleted).toBe(false);
            expect(result.current.rows).toEqual([
                storedDetailThree,
                storedDetailTwo,
                storedDetailOne,
            ]);
        });

        it('should sort desc all details by line number', () => {
            const detailOne = {
                id: 1,
                lineNumber: 1,
                item: {
                    id: 1,
                    itemName: 'item one',
                    description: 'item description one',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item one',
                quantity: 5,
                unitPrice: 10,
                totalPrice: 50,
                deleted: false,
            };

            const detailTwo = {
                id: 2,
                lineNumber: 2,
                item: {
                    id: 2,
                    itemName: 'item two',
                    description: 'item description two',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item two',
                quantity: 2,
                unitPrice: 25,
                totalPrice: 50,
                deleted: false,
            };

            const detailThree = {
                id: 3,
                lineNumber: 3,
                item: {
                    id: 3,
                    itemName: 'item three',
                    description: 'item description three',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item two',
                quantity: 4,
                unitPrice: 5,
                totalPrice: 20,
                deleted: false,
            };

            const details = [detailOne, detailTwo, detailThree];

            let rows = null;

            const { result } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: 3,
                    initialDetails: details,
                },
            });

            act(() => {
                rows = result.current.sortRow(details);
            });

            expect(rows.length).toBe(3);
            expect(rows).toEqual([detailThree, detailTwo, detailOne]);
        });
    });

    describe('dispatch and reception forms', () => {
        const warehouse = {
            id: 1,
            warehouseName: 'warehouse one',
            itemSummary: [],
            used: false,
            deleted: false,
        };

        it('should be able to initialize an empty document', () => {
            const { result: document } = renderHook(useDocumentForm, {
                initialProps: {
                    initialState: undefined,
                    defaultInitialState: inputDocumentState,
                },
            });

            const { result: details } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: undefined,
                },
            });

            expect(details.current.lineCounter).toBe(1);

            expect(document.current.document.details).toEqual([]);
            expect(document.current.document).toEqual(inputDocumentState);
            expect(document.current.documentCopy).toEqual(inputDocumentState);
            expect(document.current.initialDocument).toEqual(inputDocumentState);
        });

        it('should be able to change any field except details', () => {
            const { result: document } = renderHook(useDocumentForm, {
                initialProps: {
                    initialState: undefined,
                    defaultInitialState: inputDocumentState,
                },
            });

            const { result: details } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: undefined,
                    initialDetails: undefined,
                },
            });

            act(() => {
                document.current.updateDocumentField(
                    'description',
                    'input document one description'
                );
            });

            act(() => {
                const today = new Date(2023, 7, 18, 23, 41, 50, 0);
                document.current.updateDocumentField('date', today);
            });

            act(() => {
                document.current.updateDocumentField('warehouse', warehouse);
            });

            expect(document.current.addButtonDisabled).toBe(false);
            expect(document.current.saveButtonDisabled).toBe(false);
            expect(document.current.deleteButtonDisabled).toBe(true);
            expect(document.current.releaseButtonDisabled).toBe(true);

            expect(document.current.document.counter).toBe(0);
            expect(document.current.documentCopy).toEqual(inputDocumentState);
            expect(document.current.initialDocument).toEqual(inputDocumentState);

            expect(details.current.lineCounter).toBe(1);
        });

        it('should be able to change details', () => {
            const detailOne = {
                id: null,
                lineNumber: 0,
                item: {
                    id: 1,
                    itemName: 'item one',
                    description: 'item description one',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item one',
                quantity: 5,
                unitPrice: 10,
                totalPrice: 50,
                deleted: false,
            };

            const detailTwo = {
                id: null,
                lineNumber: 0,
                item: {
                    id: 2,
                    itemName: 'item two',
                    description: 'item description two',
                    valuationType: 'AVERAGE',
                    used: false,
                },
                description: 'detail item two',
                quantity: 3,
                unitPrice: 8,
                totalPrice: 24,
                deleted: false,
            };

            const { result: document } = renderHook(useDocumentForm, {
                initialProps: {
                    initialState: undefined,
                    defaultInitialState: inputDocumentState,
                },
            });

            const { result: details } = renderHook(useDetail, {
                initialProps: {
                    initialCounter: undefined,
                    initialDetails: undefined,
                },
            });

            act(() => {
                document.current.updateDocumentField(
                    'description',
                    'input document one description'
                );
            });

            act(() => {
                const today = new Date(2023, 7, 18, 23, 41, 50, 0);
                document.current.updateDocumentField('date', today);
            });

            act(() => {
                document.current.updateDocumentField('warehouse', warehouse);
            });

            act(() => {
                const detail = details.current.createDetail(detailOne);
                details.current.addDetail(detail);
            });

            act(() => {
                const detail = details.current.createDetail(detailTwo);
                details.current.addDetail(detail);
            });

            expect(document.current.addButtonDisabled).toBe(false);
            expect(document.current.saveButtonDisabled).toBe(false);
            expect(document.current.deleteButtonDisabled).toBe(true);
            expect(document.current.releaseButtonDisabled).toBe(true);

            expect(document.current.document.counter).toBe(0);
            expect(document.current.documentCopy).toEqual(inputDocumentState);
            expect(document.current.initialDocument).toEqual(inputDocumentState);

            expect(details.current.rows[1].id).toBeNull();
            expect(details.current.rows[1].lineNumber).toBe(1);
            expect(details.current.rows[1].item).toEqual(detailOne.item);
            expect(details.current.rows[1].deleted).toEqual(detailOne.deleted);
            expect(details.current.rows[1].quantity).toEqual(detailOne.quantity);
            expect(details.current.rows[1].unitPrice).toEqual(detailOne.unitPrice);
            expect(details.current.rows[1].totalPrice).toEqual(detailOne.totalPrice);
            expect(details.current.rows[1].description).toEqual(detailOne.description);

            expect(details.current.rows[0].id).toBeNull();
            expect(details.current.rows[0].lineNumber).toBe(2);
            expect(details.current.rows[0].item).toEqual(detailTwo.item);
            expect(details.current.rows[0].deleted).toEqual(detailTwo.deleted);
            expect(details.current.rows[0].quantity).toEqual(detailTwo.quantity);
            expect(details.current.rows[0].unitPrice).toEqual(detailTwo.unitPrice);
            expect(details.current.rows[0].totalPrice).toEqual(detailTwo.totalPrice);
            expect(details.current.rows[0].description).toEqual(detailTwo.description);

            expect(details.current.lineCounter).toBe(3);
            expect(details.current.rows.length).toBe(2);
        });
    });
});
