import { useState } from 'react';
import { isEmpty, getValue } from '@utils';

export const useFormState = (initialState, defaultInitialState) => {
    initialState = isEmpty(initialState) ? defaultInitialState : initialState;
    const [state, setState] = useState(initialState);

    const updateField = (field, event) => {
        let value = getValue(event);
        const _state = { ...state };
        _state[field] = value;
        updateState(_state);
    };

    const updateState = (_state) => {
        setState(_state);
    };

    return { state, updateField, updateState };
};

export const useStateStatus = (state, field) => {
    const [usedIcon, setUsedIcon] = useState('pi pi-lock-open');
    const [usedLabel, setUsedLabel] = useState('Desbloqueado');

    const updateStateStatus = () => {
        if (state[field]) {
            setUsedIcon('pi pi-lock');
            setUsedLabel('Bloqueado');
        } else {
            setUsedIcon('pi pi-lock-open');
            setUsedLabel('Desbloqueado');
        }
    };

    return { usedIcon, usedLabel, updateStateStatus };
};
