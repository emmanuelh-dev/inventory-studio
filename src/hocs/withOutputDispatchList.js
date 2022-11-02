import { documentSearchFields, documentFilters } from '@constants/options';

export const withOutputDispatchList = (WrappedComponent) => (props) => {
    const endpoint = {
        redirect: 'dispatch/OUTPUT/id',
        search: process.env.NEXT_PUBLIC_OU_DISPATCHES_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_OU_DISPATCHES_SUGGESTIONS,
    };

    return (
        <WrappedComponent
            endpoint={endpoint}
            filters={documentFilters}
            fields={documentSearchFields}
        />
    );
};
