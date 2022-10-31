import { documentSearchFields, documentFilters } from '@constants/options';

export const withSalesReturnReceptionList = (WrappedComponent) => (props) => {
    const endpoint = {
        redirect: 'reception/SALES_RETURN/id',
        search: process.env.NEXT_PUBLIC_SR_RECEPTIONS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_SR_RECEPTIONS_SUGGESTIONS,
    };

    return (
        <WrappedComponent
            endpoint={endpoint}
            filters={documentFilters}
            fields={documentSearchFields}
        />
    );
};
