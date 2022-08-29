import React, { useEffect } from 'react';

import { itemState, itemFields } from '@constants';
import { valuation, toolbar, itemSearchFields } from '@constants/options';

//hooks
import { useCopy } from '@hooks/useCopy';
import { useSearch } from '@hooks/useSearch';
import { useNew, useSave } from '@hooks/useToolbar';
import { useNotification } from '@hooks/useNotification';
import { useFormState, useStateStatus } from '@hooks/useFormState';

export const withItem = (WrappedComponent) => (props) => {
    const endpoint = {
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
        save: process.env.NEXT_PUBLIC_ITEMS_SAVE,
        update: process.env.NEXT_PUBLIC_ITEMS_SAVE,
    };

    let { initialState } = { ...props };
    initialState = initialState == undefined || initialState == null ? itemState : initialState;
    const { state, updateField, updateState } = useFormState(initialState);
    const { buttonState, updateCopy, updateSaveButton } = useCopy(initialState, state);

    const { onNew } = useNew(updateState, updateCopy, itemState);
    const { notification, showNotification } = useNotification();
    const { onSave } = useSave(itemFields.ID, endpoint, showNotification);
    const { usedIcon, usedLabel, updateStateStatus } = useStateStatus(state, itemFields.USED);
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateState, updateCopy);

    const _toolbar = [...toolbar];
    _toolbar[0].command = onNew;
    _toolbar[1].command = () => {
        onSave(state, updateState, updateCopy);
    };
    _toolbar[1].disabled = buttonState;
    _toolbar[2].disabled = state[itemFields.USED] || !state[itemFields.ID];

    const options = {
        valuation: valuation,
        toolbar: _toolbar,
        searchFields: itemSearchFields,
    };

    useEffect(() => {
        updateStateStatus();
        updateSaveButton();
    }, [state]);

    return (
        <WrappedComponent
            item={state}
            updateField={updateField}
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
