/**
 * @param {object} object
 * Validate if a object is empty
 */
export const isEmpty = (object) => {
    return !object || object === undefined || Object.keys(object).length === 0;
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
        return `/${key}/${params[key]}`;
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
    const keys = Object.keys(data);

    const dateKeys = keys.reduce((previous, key) => {
        if (key.includes('date') || key.includes('Date')) previous.push(key);
        return previous;
    }, []);

    if (dateKeys == null || dateKeys == undefined || dateKeys.length === 0) {
        return data;
    }

    const convert = (value) => {
        // 01-09-2022 01:57:07.400
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
        const _value = new Date();
        _value.setDate(day);
        _value.setMonth(month - 1);
        _value.setFullYear(year);
        _value.setHours(hour);
        _value.setMinutes(minute);
        _value.setSeconds(seconds);
        _value.setMilliseconds(milliseconds);
        return _value;
    };

    const dates = dateKeys.reduce((previous, key) => {
        const value = convert(data[key]);
        previous[key] = value;
        return previous;
    }, {});

    const _data = { ...data, ...dates };

    return _data;
};
