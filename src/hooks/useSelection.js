import { useState } from 'react';
export const useSelection = () => {
    const [selection, setSelection] = useState([]);

    const updateSelection = (value) => {
        setSelection(value);
    };

    const clearSelection = () => {
        setSelection([]);
    };

    return { selection, clearSelection, updateSelection };
};
