import { itemSearchFields, itemFilters } from '@constants/options';

export const withItemList = (WrappedComponent) => (props) => {
    const endpoint = {
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        redirect: 'item',
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
    };
    return <WrappedComponent endpoint={endpoint} fields={itemSearchFields} filters={itemFilters} />;
};
