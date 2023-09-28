import { FilterMatchMode } from 'primereact/api';
import {
    UsedChip,
    StatusChip,
    ValuationType,
    objectTemplate,
    amountTemplate,
    quantityTemplate,
} from '@components/templates';

export const valuation = [{ label: 'Promedio Ponderado', value: 'AVERAGE' }];

export const receptionTypes = [
    { label: 'Ingreso', value: 'INPUT' },
    { label: 'Devolucion por venta', value: 'SALES_RETURN' },
];

export const dispatchTypes = [
    { label: 'Salida', value: 'OUTPUT' },
    { label: 'Devolucion por compra', value: 'PURCHASE_RETURN' },
];

export const documentTypes = {
    INPUT: 'Ingreso',
    OUTPUT: 'Salida',
    SALE_RETURN: 'Devolucion por venta',
    PURCHASE_RETURN: 'Devolucion por compra',
};

export const documentStatus = {
    OPEN: 'Abierto',
    RELEASED: 'Liberado',
};

export const toolbar = [
    {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
    },
    {
        label: 'Guardar',
        icon: 'pi pi-fw pi-save',
    },
    {
        label: 'Cancelar',
        icon: 'pi pi-fw pi-times',
    },
    {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
    },
    {
        label: 'Acciones',
        items: [],
    },
];

export const detailsToolbar = [
    {
        label: 'Agregar',
        icon: 'pi pi-fw pi-plus-circle',
    },
    {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-minus-circle',
    },
];

export const detailColumns = [
    {
        field: 'item',
        header: 'Articulos',
        body: (row, field) => {
            return objectTemplate(row, field);
        },
    },
    {
        field: 'description',
        header: 'Descripcion',
        body: (row, field) => {
            return row[field];
        },
    },
    {
        field: 'quantity',
        header: 'Cantidad',
        body: (row, field) => {
            return quantityTemplate(row, field);
        },
    },
    {
        field: 'unitPrice',
        header: 'Precio Unitario',
        body: (row, field) => {
            return amountTemplate(row, field);
        },
    },
    {
        field: 'totalPrice',
        header: 'Precio Total',
        body: (row, field) => {
            return amountTemplate(row, field);
        },
    },
];

export const itemSearchFields = [
    {
        field: 'itemName',
        header: 'Articulo',
        filter: true,
    },
    {
        field: 'description',
        header: 'Descripcion',
        filter: false,
    },
    {
        field: 'valuationType',
        header: 'Metodo de Valuacion',
        template: (row) => <ValuationType value={row['valuationType']} />,
    },
];

export const itemFilters = {
    itemName: { value: '', matchMode: FilterMatchMode.CONTAINS },
};

export const warehouseSearchFields = [
    {
        field: 'warehouseName',
        header: 'Almacen',
        filter: true,
    },
    {
        field: 'locked',
        header: 'Estado',
        template: (row) => <UsedChip value={row['locked']} />,
    },
];

export const warehouseFilters = {
    warehouseName: { value: '', matchMode: FilterMatchMode.CONTAINS },
};

export const dropdownLabelOptions = {
    warehouse: 'warehouseName',
};

export const documentFilters = {
    id: { value: '', matchMode: FilterMatchMode.CONTAINS },
    date: { value: '', matchMode: FilterMatchMode.CONTAINS },
    status: { value: '', matchMode: FilterMatchMode.CONTAINS },
};

export const documentSearchFields = [
    {
        field: 'id',
        header: 'Folio',
        filter: true,
    },
    {
        field: 'date',
        header: 'Fecha',
        filter: true,
    },
    {
        field: 'status',
        header: 'Estado',
        filter: true,
        template: (row) => <StatusChip value={row} />,
    },
    {
        field: 'warehouse',
        header: 'Almacen',
        filter: true,
        template: (row) => row['warehouse']['warehouseName'],
    },
    {
        field: 'totalQuantity',
        header: 'Cantidad total',
    },
    {
        field: 'totalAmount',
        header: 'Monto total',
    },
];
