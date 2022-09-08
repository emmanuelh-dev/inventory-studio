import { useState } from 'react';
export const useControlField = (field, initialValue) => {
    const [controlField, setcontrolField] = useState(initialValue);

    const validate = () => {
        return controlField == field;
    };

    const updateControlField = (event) => {
        setcontrolField(event.target.value);
    };

    return { controlField, updateControlField, validate };
};
