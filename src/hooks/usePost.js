import { buildFetchOptions } from '@utils/request';

export const usePost = async (url, body) => {
    const options = buildFetchOptions('POST', body);
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};
