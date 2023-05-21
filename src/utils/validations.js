import { isNullOrUndefinedOrEmptyString } from '@utils';
import { MESSAGE_TYPES, validationFields } from '@constants';

const fields = validationFields;

export const validateRepeatedItem = (detail, details, showNotification) => {
    const validate = details.find(
        (element) =>
            element[fields.ITEM][fields.ID] == detail[fields.ITEM][fields.ID] &&
            element[fields.LINE_NUMBER] !== detail[fields.LINE_NUMBER]
    );

    validate = validate != undefined;
    if (validate) {
        const message = `El articulo ${
            detail[fields.ITEM].itemName
        } ya se encuentra en este documento`;
        showNotification(MESSAGE_TYPES.ERROR, message);
    }
    return validate;
};

export const validateNotEmptyField = (value, fieldLabel, showNotification) => {
    const isBlankOrEmpty = isNullOrUndefinedOrEmptyString(value);

    if (isBlankOrEmpty) {
        const message = `El campo ${fieldLabel} esta vacio`;
        showNotification(MESSAGE_TYPES.ERROR, message);
    }

    return !isBlankOrEmpty;
};
