import { FilterMatchMode } from 'primereact/api';
import {
    toolbar,
    valuation,
    itemFilters,
    dispatchTypes,
    detailColumns,
    documentTypes,
    receptionTypes,
    detailsToolbar,
    documentFilters,
    itemSearchFields,
    warehouseFilters,
    dropdownLabelOptions,
    warehouseSearchFields,
} from '@constants/options';
describe('Options', () => {
    describe('valuation', () => {
        it('has only average valuation type as object', () => {
            const result = valuation[0];
            expect(valuation.length).toBe(1);
            expect(result.value).toBe('AVERAGE');
            expect(result.label).toBe('Promedio Ponderado');
        });
    });

    describe('receptionTypes', () => {
        it('has two element in the array', () => {
            expect(receptionTypes.length).toBe(2);
        });

        it('object of type input on the first place', () => {
            const result = receptionTypes[0];
            expect(result.label).toBe('Ingreso');
            expect(result.value).toBe('INPUT');
        });

        it('object of type sales return on the second place', () => {
            const result = receptionTypes[1];
            expect(result.label).toBe('Devolucion por venta');
            expect(result.value).toBe('SALES_RETURN');
        });
    });

    describe('dispatchTypes', () => {
        it('has two element in the array', () => {
            expect(dispatchTypes.length).toBe(2);
        });

        it('object of type output on the first place', () => {
            const result = dispatchTypes[0];
            expect(result.label).toBe('Salida');
            expect(result.value).toBe('OUTPUT');
        });

        it('object of type purchase return on the second place', () => {
            const result = dispatchTypes[1];
            expect(result.label).toBe('Devolucion por compra');
            expect(result.value).toBe('PURCHASE_RETURN');
        });
    });

    describe('documentTypes', () => {
        it('has ingreso, salida, devolucion por venta and devolucion por compra value for its keys', () => {
            expect(documentTypes.INPUT).toBe('Ingreso');
            expect(documentTypes.OUTPUT).toBe('Salida');
            expect(documentTypes.SALE_RETURN).toBe('Devolucion por venta');
            expect(documentTypes.PURCHASE_RETURN).toBe('Devolucion por compra');
        });
    });

    describe('toolbar', () => {
        it('has array with five elements for basic toolbar', () => {
            expect(toolbar.length).toBe(5);
        });

        it('should have correct label and icon value for Nuevo element', () => {
            const result = toolbar[0];
            expect(result.label).toBe('Nuevo');
            expect(result.icon).toBe('pi pi-fw pi-plus');
        });

        it('should have correct label and icon value for Guardar element', () => {
            const result = toolbar[1];
            expect(result.label).toBe('Guardar');
            expect(result.icon).toBe('pi pi-fw pi-save');
        });

        it('should have correct label and icon value for Cancelar element', () => {
            const result = toolbar[2];
            expect(result.label).toBe('Cancelar');
            expect(result.icon).toBe('pi pi-fw pi-times');
        });

        it('should have correct label and icon value for Eliminar element', () => {
            const result = toolbar[3];
            expect(result.label).toBe('Eliminar');
            expect(result.icon).toBe('pi pi-fw pi-trash');
        });

        it('should have correct label and items value for Acciones element', () => {
            const result = toolbar[4];
            expect(result.label).toBe('Acciones');
            expect(result.items).toEqual([]);
        });
    });

    describe('detailsToolbar', () => {
        it('should have two elements', () => {
            expect(Array.isArray(detailsToolbar)).toBe(true);
            expect(detailsToolbar.length).toBe(2);
        });

        it('should have correct label and icon for Agregar element', () => {
            const result = detailsToolbar[0];
            expect(result.label).toBe('Agregar');
            expect(result.icon).toBe('pi pi-fw pi-plus-circle');
        });

        it('should have correct label and icon for Eliminar element', () => {
            const result = detailsToolbar[1];
            expect(result.label).toBe('Eliminar');
            expect(result.icon).toBe('pi pi-fw pi-minus-circle');
        });
    });

    describe('detailColumns', () => {
        it('shoud have 5 elements in the array', () => {
            expect(Array.isArray(detailColumns)).toBe(true);
            expect(detailColumns.length).toBe(5);
        });

        it('shoud have correct field, header and body for the first element', () => {
            const result = detailColumns[0];
            const row = {
                item: {
                    itemName: 'Item One',
                },
            };
            expect(result.field).toBe('item');
            expect(result.header).toBe('Articulos');
            expect(result.body(row, result.field)).toBe('Item One');
        });

        it('shoud have correct field, header and body for the second element', () => {
            const result = detailColumns[1];
            const row = {
                item: {
                    itemName: 'Item One',
                },
                description: 'item descripion one',
            };
            expect(result.field).toBe('description');
            expect(result.header).toBe('Descripcion');
            expect(result.body(row, result.field)).toBe('item descripion one');
        });

        it('shoud have correct field, header and body for the third element', () => {
            const result = detailColumns[2];
            const row = {
                item: {
                    itemName: 'Item One',
                },
                description: 'item descripion one',
                quantity: 11987,
            };
            expect(result.field).toBe('quantity');
            expect(result.header).toBe('Cantidad');
            expect(result.body(row, result.field)).toBe('11,987');
        });

        it('shoud have correct field, header and body for the fourth element', () => {
            const result = detailColumns[3];
            const row = {
                item: {
                    itemName: 'Item One',
                },
                description: 'item descripion one',
                quantity: 11987,
                unitPrice: 63345,
            };
            expect(result.field).toBe('unitPrice');
            expect(result.header).toBe('Precio Unitario');
            expect(result.body(row, result.field)).toBe('$63,345.00');
        });

        it('shoud have correct field, header and body for the fifth element', () => {
            const result = detailColumns[4];
            const row = {
                item: {
                    itemName: 'Item One',
                },
                description: 'item descripion one',
                quantity: 11987,
                unitPrice: 63345,
                totalPrice: 239546,
            };
            expect(result.field).toBe('totalPrice');
            expect(result.header).toBe('Precio Total');
            expect(result.body(row, result.field)).toBe('$239,546.00');
        });
    });

    describe('itemSearchFields', () => {
        it('should have three elements', () => {
            expect(Array.isArray(itemSearchFields)).toBe(true);
            expect(itemSearchFields.length).toBe(3);
        });

        it('should have correct objeect for item name', () => {
            const result = itemSearchFields[0];
            expect(result.field).toBe('itemName');
            expect(result.header).toBe('Articulo');
            expect(result.filter).toBe(true);
        });

        it('should have correct objeect for description', () => {
            const result = itemSearchFields[1];
            expect(result.field).toBe('description');
            expect(result.header).toBe('Descripcion');
            expect(result.filter).toBe(false);
        });

        it('should have correct objeect for valuationType', () => {
            const result = itemSearchFields[2];
            expect(result.field).toBe('valuationType');
            expect(result.header).toBe('Metodo de Valuacion');
        });
    });

    describe('itemFilters', () => {
        it('should have filter by item name', () => {
            const result = itemFilters.itemName;
            expect(result.value).toBe('');
            expect(result.matchMode).toBe(FilterMatchMode.CONTAINS);
        });
    });

    describe('warehouseSearchFields', () => {
        it('should have two elements', () => {
            expect(warehouseSearchFields.length).toBe(2);
        });

        it('should have correct object for warehouse name filter', () => {
            const result = warehouseSearchFields[0];
            expect(result.field).toBe('warehouseName');
            expect(result.header).toBe('Almacen');
            expect(result.filter).toBe(true);
        });

        it('should have correct object for warehouse used field filter', () => {
            const result = warehouseSearchFields[1];
            expect(result.field).toBe('used');
            expect(result.header).toBe('Estado');
        });
    });

    describe('warehouseFilters', () => {
        it('should have filter by warehouse name', () => {
            const result = warehouseFilters.warehouseName;
            expect(result.value).toBe('');
            expect(result.matchMode).toBe(FilterMatchMode.CONTAINS);
        });
    });

    describe('dropdownLabelOptions', () => {
        it('should have the label option for warehousee', () => {
            expect(dropdownLabelOptions.warehouse).toBe('warehouseName');
        });
    });

    describe('documentFilters', () => {
        it('should have filter by document id', () => {
            const result = documentFilters.id;
            expect(result.value).toBe('');
            expect(result.matchMode).toBe(FilterMatchMode.CONTAINS);
        });

        it('should have filter by document da', () => {
            const result = documentFilters.date;
            expect(result.value).toBe('');
            expect(result.matchMode).toBe(FilterMatchMode.CONTAINS);
        });
    });
});
