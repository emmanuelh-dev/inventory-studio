import { getSession } from 'next-auth/react';
import { buildFetchOptions } from '@utils/request';

export const usePut = async (url, body) => {
    const session = await getSession();
    const options = buildFetchOptions('PUT', session, body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
    const data = await response.json();
    return data;
};
