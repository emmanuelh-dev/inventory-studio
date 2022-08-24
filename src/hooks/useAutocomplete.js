import { useState } from "react";
import { useGet } from "@hooks/useGet";
import { isEmpty, findObjectByProp } from "@utils";
export const useAutocomplete = (updateStateField, updateState, initialState, endpoint) => {
    const [suggestions, setSuggestions] = useState([]);

    const updateSuggestions = (_suggestions) => {
        setSuggestions(_suggestions);
    };

    const autocompleteChange = (field, event) => {
        if (typeof event.value === "string") {
            if (!isEmpty(event.value)) {
                useGet(`${endpoint.search}/${event.value}`).then((data) => {
                    updateSuggestions(data.content);
                });
            } else {
                useGet(endpoint.suggestions).then((data) => {
                    updateSuggestions(data);
                });
            }

            updateStateField(field, event);
        }
    };

    const filterSuggestions = (field, event) => {
        const result = suggestions.filter((option) => {
            return option[field].includes(event.query);
        });

        updateSuggestions(result);
    };

    const autocompleteSelect = (event) => {
        updateState(event.value);
    };

    const autocompleteBlur = (field, event) => {
        const value = event.target.value;
        const option = findObjectByProp(suggestions, field, value);
        if (!isEmpty(option)) {
            updateState(option);
        } else {
            const _initialState = { ...initialState };
            _initialState[field] = value;
            updateState(_initialState);
        }
    };

    return {
        suggestions,
        updateSuggestions,
        filterSuggestions,
        autocompleteChange,
        autocompleteSelect,
        autocompleteBlur,
    };
};
