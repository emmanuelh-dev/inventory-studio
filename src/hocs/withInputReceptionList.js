import { documentSearchFields, documentFilters } from '@constants/options';

export const withInputReceptionList = (WrappedComponent) => (props) => {
    const endpoint = {
        redirect: 'reception/INPUT/id',
        search: process.env.NEXT_PUBLIC_RECEPTIONS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_IN_RECEPTIONS_SUGGESTIONS,
    };

    return (
        <WrappedComponent
            endpoint={endpoint}
            filters={documentFilters}
            fields={documentSearchFields}
        />
    );
};
