/**
 * @param {object} object
 * Validate if an object is empty
 */
export const isObjectEmpty = (object) => {
    return !object || object === undefined || Object.keys(object).length === 0;
};
/**
 * @param {object} object
 * Validate if an Array is empty
 */
export const isArrayEmpty = (array) => {
    return array == null || array === undefined || array.length === 0;
};

/**
 * Encuentra y devuelve un objeto de un arreglo, buscando por
 * el valor de una de sus propiedades
 * @param {array} array
 * @param {string} property
 * @param {any} value
 */
export const findObjectByProp = (array, property, value) => {
    return array != undefined ? array.find((element) => element[property] === value) : {};
};

/**
 * It returns url with rest params
 * @param {object} params
 * @returns url rest params
 */
export const buildUrl = (baseUrl, params) => {
    if (Object.keys(params).length === 0) {
        return baseUrl;
    }

    const keys = Object.keys(params);
    const query = keys.reduce((previous, key) => {
        return (previous += `/${key}/${params[key]}`);
    }, '');

    return `${baseUrl}${query}`;
};

export const dateToString = (data) => {
    const keys = Object.keys(data);

    const dateKeys = keys.reduce((previous, key) => {
        if (data[key] instanceof Date) previous.push(key);
        return previous;
    }, []);

    if (dateKeys == null || dateKeys == undefined || dateKeys.length === 0) {
        return data;
    }

    const convert = (value) => {
        const day = `${value.getDate()}`.padStart(2, '0');
        const month = `${value.getMonth() + 1}`.padStart(2, '0');
        const date = `${day}-${month}-${value.getFullYear()}`;
        const hour = `${value.getHours()}`.padStart(2, '0');
        const minutes = `${value.getMinutes()}`.padStart(2, '0');
        const seconds = `${value.getSeconds()}`.padStart(2, '0');
        const milliseconds = `${value.getMilliseconds()}`.padStart(3, '0');
        const time = `${hour}:${minutes}:${seconds}.${milliseconds}`;
        return `${date} ${time}`;
    };

    const dates = dateKeys.reduce((previous, key) => {
        const value = convert(data[key]);
        previous[key] = value;
        return previous;
    }, {});

    const _data = { ...data, ...dates };

    return _data;
};

export const stringToDate = (data) => {
    if (data == null || data == undefined) return;
    const keys = Object.keys(data);

    const dateKeys = keys.reduce((previous, key) => {
        if (key.includes('date') || key.includes('Date')) previous.push(key);
        return previous;
    }, []);

    if (dateKeys == null || dateKeys == undefined || dateKeys.length === 0) {
        return data;
    }

    const convert = (value) => {
        const chunks = value.split(' ');
        const date = chunks[0].split('-');
        const day = date[0];
        const month = date[1];
        const year = date[2];
        const time = chunks[1].split(':');
        const hour = time[0];
        const minute = time[1];
        const seconds = time[2].slice(0, 2);
        const milliseconds = time[2].slice(2);
        const _date = new Date();
        _date.setDate(day);
        _date.setMonth(month - 1);
        _date.setFullYear(year);
        _date.setHours(hour);
        _date.setMinutes(minute);
        _date.setSeconds(seconds);
        _date.setMilliseconds(milliseconds);
        return _date;
    };

    const dates = dateKeys.reduce((previous, key) => {
        const value = convert(data[key]);
        previous[key] = value;
        return previous;
    }, {});

    const _data = { ...data, ...dates };

    return _data;
};

export const getValue = (event) => {
    if (event.target == undefined) {
        return event.value;
    }
    return event.target.value;
};

export const findKey = (object, keyName) => {
    const keys = Object.keys(object);

    return keys.find((element) => element.includes(keyName));
};

export const replaceParams = (baseUrl, params) => {
    if (Object.keys(params).length === 0) {
        return baseUrl;
    }

    const keys = Object.keys(params);

    const url = keys.reduce((previous, key) => {
        previous = previous.replace(`{${key}}`, params[key]);
        return previous;
    }, baseUrl);

    return url;
};

export const transformFilter = (filter) => {
    const keys = Object.keys(filter);

    const elements = keys.reduce((previous, key) => {
        const value = filter[key].value;

        if (value) {
            previous[key] = filter[key].value;
        }

        return previous;
    }, {});

    return elements;
};

export const isOutputDocument = (type) => {
    return type === 'OUTPUT';
};

export const isInputDocument = (type) => {
    return type === 'INPUT';
};

export const isDispatchDocument = (type) => {
    return type === 'OUTPUT' || type === 'PURCHASE_RETURN';
};

export const isNullOrUndefinedOrEmptyString = (value) => {
    return value === null || value === undefined || value == '';
};

const isSameItem = (fields, element, detail) => {
    const isDeletedRow = element[fields.DELETED];
    const isSameLineNumber = element[fields.LINE_NUMBER] == detail[fields.LINE_NUMBER];
    const isSameItemId = element[fields.ITEM][fields.ID] == detail[fields.ITEM][fields.ID];
    return isSameItemId && !isSameLineNumber && !isDeletedRow;
};

export const ifItemPresent = (fields, details, detail) => {
    const result = details.find((element) => isSameItem(fields, element, detail));

    return result;
};
