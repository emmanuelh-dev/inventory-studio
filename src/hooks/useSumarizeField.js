import { useEffect } from 'react';
export const useSumarizeField = (state, updateState, fields) => {
    useEffect(() => {
        const totalAmount = state[fields.DETAILS].reduce((previousValue, element) => {
            if (element[fields.DELETED]) {
                return previousValue + 0;
            }
            return previousValue + element[fields.TOTAL_PRICE];
        }, 0);

        const totalQuantity = state[fields.DETAILS].reduce((previousValue, element) => {
            if (element[fields.DELETED]) {
                return previousValue + 0;
            }
            return previousValue + element[fields.QUANTITY];
        }, 0);

        const _state = { ...state };
        _state[fields.TOTAL_AMOUNT] = totalAmount;
        _state[fields.TOTAL_QUANTITY] = totalQuantity;
        updateState(_state);
    }, [state[fields.DETAILS]]);
};
