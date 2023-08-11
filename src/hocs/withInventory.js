import React, { useState, useEffect } from 'react';
//constants
import { warehouseSearchFields } from '@constants/options';
import { warehouseState, warehouseFields } from '@constants';
//hooks
import { useCopy } from '@hooks/useCopy';
import { useSearch } from '@hooks/useSearch';
import { useFormState, useStateStatus } from '@hooks/useFormState';

export const withInventory = (WrappedComponent) => {
    const WithInventory = () => {
        const options = {
            searchFields: warehouseSearchFields,
        };

        const initialState = { ...warehouseState };
        const { state, updateState } = useFormState(initialState);
        const { updateCopy } = useCopy(initialState, state);
        const { search, showSearch, hideSearch, selectOption } = useSearch(updateState, updateCopy);
        const { usedIcon, usedLabel, updateStateStatus } = useStateStatus(
            state,
            warehouseFields.USED
        );

        useEffect(() => {
            updateStateStatus();
        }, [state]);

        return (
            <WrappedComponent
                warehouse={state}
                options={options}
                usedIcon={usedIcon}
                usedLabel={usedLabel}
                searchVisible={search}
                showSearch={showSearch}
                hideSearch={hideSearch}
                fields={warehouseFields}
                selectOption={selectOption}
            />
        );
    };

    return WithInventory;
};
