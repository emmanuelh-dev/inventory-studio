import { itemSearchFields, itemFilters } from '@constants/options';

export const withItemList = (WrappedComponent) => (props) => {
    const endpoint = {
        redirect: 'item',
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
    };
    return <WrappedComponent endpoint={endpoint} fields={itemSearchFields} filters={itemFilters} />;
};
