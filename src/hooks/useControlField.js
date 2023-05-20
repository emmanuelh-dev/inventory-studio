import { useState } from 'react';
import { MESSAGE_TYPES } from '@constants';
export const useControlField = (fieldValue, showNotification, initialValue) => {
    const [controlField, setcontrolField] = useState(initialValue);

    const validate = (fieldName) => {
        const validation = controlField !== fieldValue;
        if (validation) {
            const message = `El campo de control ${fieldName} no concide con su campo totalizado`;
            showNotification(MESSAGE_TYPES.ERROR, message);
        }
        return !validation;
    };

    const updateControlField = (event) => {
        setcontrolField(event.target.value);
    };

    const clearControlField = () => {
        setcontrolField(initialValue);
    };

    return { controlField, updateControlField, validate, clearControlField };
};
