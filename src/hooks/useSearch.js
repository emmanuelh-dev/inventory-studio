import { useState } from 'react';
import { useGet } from '@hooks/useGet';

export const useSearch = (endpoint, updateSuggestions, updateState) => {
    const [search, setSearch] = useState(false);

    const showSearch = () => {
        useGet(endpoint.suggestions).then((data) => {
            updateSuggestions(data.content);
        });
        setSearch(true);
    };

    const hideSearch = () => {
        setSearch(false);
    };

    const selectOption = (option) => {
        updateState(option);
    };

    const nextPage = (page) => {
        useGet(`${endpoint.suggestions}?page=${page}&limit=10`).then((data) => {
            updateSuggestions(data.content);
        });
    };

    return { search, showSearch, hideSearch, selectOption, nextPage };
};
