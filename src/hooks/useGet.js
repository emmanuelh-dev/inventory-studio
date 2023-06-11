import { signOut, getSession } from 'next-auth/react';
import { buildFetchOptions } from '@utils/request';
export const useGet = async (url) => {
    const session = await getSession();
    const options = buildFetchOptions('GET', session, {});
    const response = await fetch(url, options);
    const body = await response.json();
    if (!response.ok) {
        await UnauthorizedHandleResponse(response, body);
    }
    return body;
};

const UnauthorizedHandleResponse = async (response, body) => {
    if (response.status != 401) {
        throw new Error(body.message);
    }

    if (body.error == 'invalid_token') {
        await signOut({ callbackUrl: '/login' });
    }
};
