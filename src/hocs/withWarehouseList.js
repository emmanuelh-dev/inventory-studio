import { warehouseSearchFields, warehouseFilters } from '@constants/options';

export const withWarehouseList = (WrappedComponent) => (props) => {
    const endpoint = {
        redirect: 'warehouse',
        search: process.env.NEXT_PUBLIC_WAREHOUSES_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS,
    };
    return (
        <WrappedComponent
            endpoint={endpoint}
            filters={warehouseFilters}
            fields={warehouseSearchFields}
        />
    );
};
