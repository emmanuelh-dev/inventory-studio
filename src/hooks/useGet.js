import { buildFetchOptions } from '@utils/request';
export const useGet = async (url, session) => {
    const options = buildFetchOptions('GET', session, {});
    const response = await fetch(url, options);

    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }

    const data = await response.json();
    return data;
};
