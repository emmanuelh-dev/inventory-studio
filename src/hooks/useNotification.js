import { useRef } from 'react';

export const useNotification = () => {
    const notification = useRef(null);

    const showNotification = (type, message) => {
        if (message) {
            type.detail = message;
        }

        notification.current.show(type);
    };

    return { notification, showNotification };
};
