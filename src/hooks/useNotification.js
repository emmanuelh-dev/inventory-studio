import { useRef } from 'react';

export const useNotification = () => {
    const notification = useRef(null);

    const showNotification = (type) => {
        notification.current.show(types[type]);
    };

    return { notification, showNotification };
};

const types = {
    success: {
        severity: 'success',
        summary: 'Existoso',
        detail: 'Registro creado con exito',
        life: 3000,
    },
    error: {
        severity: 'error',
        summary: 'Error',
        detail: 'El registro no fue guardado',
        life: 3000,
    },
};
