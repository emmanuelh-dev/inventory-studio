import { FilterMatchMode } from 'primereact/api';
import { ValuationType, UsedChip } from '@components/templates';

export const valuation = [{ label: 'Promedio Ponderado', value: 'AVERAGE' }];
export const receptionTypes = [
    { label: 'Ingreso', value: 'INPUT' },
    { label: 'Devolucion por venta', value: 'SALE_RETURN' },
];

export const toolbar = [
    {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: null,
    },
    {
        label: 'Guardar',
        icon: 'pi pi-fw pi-save',
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
        field: 'used',
        header: 'Estado',
        template: (row) => <UsedChip value={row['used']} />,
    },
];

export const warehouseFilters = {
    warehouseName: { value: '', matchMode: FilterMatchMode.CONTAINS },
};

export const dropdownLabelOptions = {
    warehouse: 'warehouseName',
};
