import { FilterMatchMode } from 'primereact/api';
import { ValuationType } from '@components/templates';

export const valuation = [{ label: 'Promedio Ponderado', value: 'AVERAGE' }];

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
    },
];

export const warehouseFilters = {
    warehouseName: { value: '', matchMode: FilterMatchMode.CONTAINS },
};
