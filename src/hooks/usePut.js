import { buildFetchOptions } from '@utils/request';

export const usePut = async (url, body) => {
    const options = buildFetchOptions('PUT', body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
    const data = await response.json();
    return data;
};
