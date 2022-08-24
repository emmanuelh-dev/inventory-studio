import React, { useEffect } from 'react';
import { valuation } from '@constants/options';
import { itemState, itemFields } from '@constants';

//hooks
import { useGet } from '@hooks/useGet';
import { useItem, useItemStatus } from '@hooks/useItem';
import { useAutocomplete } from '@hooks/useAutocomplete';

export const withItem = (WrappedComponent) => (props) => {
    const options = {
        valuation: valuation,
    };

    const endpoint = {
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
    };

    const { item, updateItemField, updateItem } = useItem(itemState);
    const {
        suggestions,
        updateSuggestions,
        filterSuggestions,
        autocompleteChange,
        autocompleteSelect,
        autocompleteBlur,
    } = useAutocomplete(updateItemField, updateItem, itemState, endpoint);

    const { usedIcon, usedLabel, updateItemStatus } = useItemStatus(item, itemFields.USED);

    useEffect(() => {
        useGet(endpoint.suggestions).then((data) => {
            updateSuggestions(data);
        });
        updateItemStatus();
    }, [item]);

    return (
        <WrappedComponent
            item={item}
            updateField={updateItemField}
            suggestions={suggestions}
            autocompleteChange={autocompleteChange}
            filterSuggestions={filterSuggestions}
            autocompleteSelect={autocompleteSelect}
            autocompleteBlur={autocompleteBlur}
            fields={itemFields}
            options={options}
            usedIcon={usedIcon}
            usedLabel={usedLabel}
        />
    );
};
