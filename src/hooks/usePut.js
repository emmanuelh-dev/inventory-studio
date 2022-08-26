import { buildFetchOptions } from '@utils/request';

export const usePut = async (url, body) => {
    const options = buildFetchOptions('PUT', body);
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};
