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

export const dateToString = (state) => {
    const keys = Object.keys(state);

    const dateKeys = keys.reduce((previous, key) => {
        if (state[key] instanceof Date) previous.push(key);
        return previous;
    }, []);

    if (dateKeys == null || dateKeys == undefined || dateKeys.length === 0) {
        return state;
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
        const value = convert(state[key]);
        previous[key] = value;
        return previous;
    }, {});

    const _state = { ...state, ...dates };

    return _state;
};
