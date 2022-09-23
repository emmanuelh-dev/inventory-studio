import { useState } from 'react';
export const useControlField = (fieldValue, initialValue) => {
    const [controlField, setcontrolField] = useState(initialValue);

    const validate = (showNotification, fieldName) => {
        if (!controlField == fieldValue) {
            const message = `El campo de control ${fieldName} no concide con su campo totalizado`;
            showNotification('error', message);
        }
    };

    const updateControlField = (event) => {
        setcontrolField(event.target.value);
    };

    return { controlField, updateControlField, validate };
};
