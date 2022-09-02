import { useState } from 'react';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { isEmpty, buildUrl, dateToString, stringToDate } from '@utils';

export const useNew = (updateState, updateCopy, initialState) => {
    const onNew = () => {
        updateState(initialState);
        updateCopy(initialState);
    };

    return { onNew };
};

export const useSave = (field, endpoint, showNotification) => {
    const [params, setParams] = useState({});

    const updateParams = (_params) => {
        setParams(_params);
    };

    const onSave = (state, updateState, updateCopy) => {
        if (isEmpty(state[field])) {
            usePost(buildUrl(endpoint.save, params), dateToString({ ...state })).then((data) => {
                updateState(stringToDate(data));
                updateCopy(stringToDate(data));
                showNotification('success');
            });
        } else {
            usePut(buildUrl(endpoint.update, params), dateToString({ ...state })).then((data) => {
                updateState(stringToDate(data));
                updateCopy(stringToDate(data));
                showNotification('success');
            });
        }
    };

    return { onSave, updateParams };
};
