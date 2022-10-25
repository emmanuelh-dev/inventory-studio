import React, { useEffect } from 'react';
import { warehouseState, warehouseFields } from '@constants';
import { toolbar, warehouseSearchFields } from '@constants/options';

//hooks
import { useCopy } from '@hooks/useCopy';
import { useSearch } from '@hooks/useSearch';
import { useNew, useSave } from '@hooks/useToolbar';
import { useNotification } from '@hooks/useNotification';
import { useFormState, useStateStatus } from '@hooks/useFormState';

export const withWarehouse = (WrappedComponent) => (props) => {
    const endpoint = {
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS,
        save: process.env.NEXT_PUBLIC_WAREHOUSES_SAVE,
        update: process.env.NEXT_PUBLIC_WAREHOUSES_SAVE,
    };

    let { initialState } = { ...props };
    initialState =
        initialState == undefined || initialState == null ? warehouseState : initialState;

    const { state, updateField, updateState } = useFormState(initialState);
    const { buttonState, updateCopy, updateSaveButton } = useCopy(initialState, state);

    const { onNew } = useNew(updateState, updateCopy, warehouseState);
    const { notification, showNotification } = useNotification();
    const { onSave } = useSave(warehouseFields.ID, endpoint, showNotification);
    const { usedIcon, usedLabel, updateStateStatus } = useStateStatus(state, warehouseFields.USED);
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateState, updateCopy);

    const _toolbar = [...toolbar];
    _toolbar[0].command = onNew;
    _toolbar[1].command = () => {
        onSave(state, updateState, updateCopy);
    };
    _toolbar[1].disabled = buttonState;
    _toolbar[2].disabled = state[warehouseFields.USED] || !state[warehouseFields.ID];

    const options = {
        toolbar: _toolbar,
        searchFields: warehouseSearchFields,
    };

    useEffect(() => {
        updateStateStatus();
        updateSaveButton();
    }, [state]);

    return (
        <WrappedComponent
            warehouse={state}
            updateField={updateField}
            fields={warehouseFields}
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
