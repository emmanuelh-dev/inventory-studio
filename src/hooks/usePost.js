import { buildFetchOptions, buildAuthOptions } from '@utils/request';

export const usePost = async (url, session, body) => {
    const options = buildFetchOptions('POST', session, body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }

    let data;
    if (url.includes('reports')) {
        data = await response.arrayBuffer();
    } else {
        data = await response.json();
    }
    return data;
};

export const useAuthPost = async (url, credentials, body) => {
    const options = buildAuthOptions(credentials, body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }

    const data = await response.json();
    return data;
};
