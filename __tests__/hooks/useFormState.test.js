import _ from 'lodash';
import { useDocumentForm } from '@hooks/useFormState';
import { renderHook, act } from '@testing-library/react';
import { outputDocumentState, purchaseReturnDocumentState } from '@constants';

describe('useFormState', () => {
    describe('useDocumentForm', () => {
        describe('output document', () => {
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
                id: 22072023,
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
                expect(result.current.document).toEqual(outputDocumentState);
                expect(result.current.documentCopy).toEqual(outputDocumentState);
                expect(result.current.saveButtonDisabled).toBe(false);
                expect(result.current.initialDocument).toEqual(outputDocumentState);
            });

            it('should be able to init the hook with initial state value for output document', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: _.cloneDeep(initialDocument),
                        defaultInitialState: outputDocumentState,
                    },
                });
                expect(result.current.document).toEqual(initialDocument);
                expect(result.current.documentCopy).toEqual(initialDocument);
                expect(result.current.saveButtonDisabled).toBe(false);
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

            it('should be able to update save button status', () => {
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
                    result.current.updateSaveButtonStatus();
                });

                expect(result.current.saveButtonDisabled).toBe(false);
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
        });
    });
});
