import { isEmpty } from '@utils';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';

export const useNew = (updateState, initialState) => {
    const onNew = () => {
        updateState(initialState);
    };

    return { onNew };
};

export const useSave = (field, endpoint, showNotification) => {
    const onSave = (state, updateState) => {
        console.log('--->', showNotification);
        if (isEmpty(state[field])) {
            usePost(endpoint.save, { ...state }).then((data) => {
                updateState(data);
                showNotification('success');
            });
        } else {
            usePut(`${endpoint.update}/${state[field]}`, { ...state }).then((data) => {
                updateState(data);
                showNotification('success');
            });
        }
    };

    return { onSave };
};
