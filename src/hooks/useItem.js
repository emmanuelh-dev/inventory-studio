import { useState } from 'react';

export const useItem = (initialState) => {
    const [item, setItem] = useState(initialState);

    const updateItemField = (field, event) => {
        let value = event.target.value;
        const _item = { ...item };
        _item[field] = value;
        updateItem(_item);
    };

    const updateItem = (_item) => {
        setItem(_item);
    };

    return { item, updateItemField, updateItem };
};

export const useItemStatus = (item, field) => {
    const [usedIcon, setUsedIcon] = useState('pi pi-lock-open');
    const [usedLabel, setUsedLabel] = useState('Desbloqueado');

    const updateItemStatus = () => {
        if (item[field]) {
            setUsedIcon('pi pi-lock');
            setUsedLabel('Bloqueado');
        } else {
            setUsedIcon('pi pi-lock-open');
            setUsedLabel('Desbloqueado');
        }
    };

    return { usedIcon, usedLabel, updateItemStatus };
};
