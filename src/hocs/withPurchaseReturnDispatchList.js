import { documentSearchFields, documentFilters } from '@constants/options';

export const withPurchaseReturnDispatchList = (WrappedComponent) => (props) => {
    const endpoint = {
        redirect: 'dispatch/PURCHASE_RETURN/id',
        search: process.env.NEXT_PUBLIC_PR_DISPATCHES_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_PR_DISPATCHES_SUGGESTIONS,
    };

    return (
        <WrappedComponent
            endpoint={endpoint}
            filters={documentFilters}
            fields={documentSearchFields}
        />
    );
};
