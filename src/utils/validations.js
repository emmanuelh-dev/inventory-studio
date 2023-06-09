import { ifItemPresent, isNullOrUndefinedOrEmptyString } from '@utils';
import { MESSAGE_TYPES, validationFields } from '@constants';

const fields = validationFields;

export const validateRepeatedItem = (detail, details, showNotification) => {
    const isRepeated = ifItemPresent(fields, details, detail);

    isRepeated = isRepeated != undefined;
    if (isRepeated) {
        const itemName = detail[fields.ITEM][fields.ITEM_NAME];
        const message = `El articulo ${itemName} ya se encuentra en este documento`;
        showNotification(MESSAGE_TYPES.ERROR, message);
    }
    return isRepeated;
};

export const validateNotEmptyField = (value, fieldLabel, showNotification) => {
    const isBlankOrEmpty = isNullOrUndefinedOrEmptyString(value);

    if (isBlankOrEmpty) {
        const message = `El campo ${fieldLabel} esta vacio`;
        showNotification(MESSAGE_TYPES.ERROR, message);
    }

    return !isBlankOrEmpty;
};

export const isReleasedOrUsed = (row) => {
    return row[fields.STATUS] === 'RELEASED' || row[fields.USED];
};
