export const useNew = (updateState, updateCopy, initialState) => {
    const onNew = (_initialState) => {
        initialState = _initialState || initialState;
        updateState(initialState);
        updateCopy(initialState);
    };

    return { onNew };
};
