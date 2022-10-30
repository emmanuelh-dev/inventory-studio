import { buildFetchOptions } from '@utils/request';

export const usePost = async (url, body) => {
    const options = buildFetchOptions('POST', body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
    const data = await response.json();
    return data;
};
