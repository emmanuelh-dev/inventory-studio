import { useState } from 'react';
import { useGet } from '@hooks/useGet';

export const useSearch = (updateState) => {
    const [search, setSearch] = useState(false);

    const showSearch = () => {
        setSearch(true);
    };

    const hideSearch = () => {
        setSearch(false);
    };

    const selectOption = (option) => {
        updateState(option);
    };

    return { search, showSearch, hideSearch, selectOption };
};
