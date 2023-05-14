import { buildFetchOptions } from '@utils/request';

export const usePut = async (url, session, body) => {
    const options = buildFetchOptions('PUT', session, body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
    const data = await response.json();
    return data;
};
