import { useState, useEffect } from 'react';
export const useSumarizeField = (state, updateField, field, totalField) => {
    useEffect(() => {
        const sum = state[field].reduce((previousValue, element) => {
            previousValue + element[field];
        }, 0);
        updateField(totalField, { target: { value: sum } });
    }, [state[field]]);
};
