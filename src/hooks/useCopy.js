import { useState } from 'react';
export const useCopy = (initialState, original) => {
    const [copy, setCopy] = useState(initialState);
    const [buttonState, setButtonState] = useState(false);

    const updateSaveButton = () => {
        const _original = JSON.stringify(original);
        const _copy = JSON.stringify(copy);
        const _initialState = JSON.stringify(initialState);
        let result = _original === _copy || _original === _initialState;
        setButtonState(result);
    };

    const updateCopy = (_copy) => {
        setCopy(_copy);
    };

    return { buttonState, updateCopy, updateSaveButton };
};
