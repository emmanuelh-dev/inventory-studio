import React, { useEffect } from 'react';
import { itemState, itemFields } from '@constants';
import { valuation, toolbar, itemSearchFields } from '@constants/options';

//hooks
import { useSearch } from '@hooks/useSearch';
import { useNew, useSave } from '@hooks/useToolbar';
import { useItem, useItemStatus } from '@hooks/useItem';
import { useNotification } from '@hooks/useNotification';

export const withItem = (WrappedComponent) => (props) => {
    const endpoint = {
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
        save: process.env.NEXT_PUBLIC_ITEMS_SAVE,
        update: process.env.NEXT_PUBLIC_ITEMS_SAVE,
    };

    const { item, updateItemField, updateItem } = useItem(itemState);
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateItem);

    const { usedIcon, usedLabel, updateItemStatus } = useItemStatus(item, itemFields.USED);
    const { onNew } = useNew(updateItem, itemState);
    const { notification, showNotification } = useNotification();
    const { onSave } = useSave(itemFields.ID, endpoint, showNotification);

    const _toolbar = [...toolbar];
    _toolbar[0].command = onNew;
    _toolbar[1].command = () => {
        onSave(item, updateItem);
    };

    const options = {
        valuation: valuation,
        toolbar: _toolbar,
        searchFields: itemSearchFields,
    };

    useEffect(() => {
        updateItemStatus();
    }, [item]);

    return (
        <WrappedComponent
            item={item}
            updateField={updateItemField}
            fields={itemFields}
            options={options}
            usedIcon={usedIcon}
            usedLabel={usedLabel}
            notification={notification}
            searchVisible={search}
            showSearch={showSearch}
            hideSearch={hideSearch}
            selectOption={selectOption}
            endpoint={endpoint}
        />
    );
};
