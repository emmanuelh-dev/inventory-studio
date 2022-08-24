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
