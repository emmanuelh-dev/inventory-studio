import { useState } from 'react';
export const useCopy = (initialState, original) => {
    const [copy, setCopy] = useState(initialState);
    const [buttonState, setButtonState] = useState(false);

    const updateSaveButton = () => {
        let result = JSON.stringify(original) === JSON.stringify(copy);
        setButtonState(result);
    };

    const updateCopy = (_copy) => {
        setCopy(_copy);
    };

    return { buttonState, updateCopy, updateSaveButton };
};
