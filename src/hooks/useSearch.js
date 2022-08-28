import { useState } from 'react';

export const useSearch = (updateState, updateCopy) => {
    const [search, setSearch] = useState(false);

    const showSearch = () => {
        setSearch(true);
    };

    const hideSearch = () => {
        setSearch(false);
    };

    const selectOption = (option) => {
        updateState(option);
        updateCopy(option);
    };

    return { search, showSearch, hideSearch, selectOption };
};
