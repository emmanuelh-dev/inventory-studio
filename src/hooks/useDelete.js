import { getSession } from 'next-auth/react';
import { buildFetchOptions } from '@utils/request';
export const useDelete = async (url) => {
    const session = await getSession();
    const options = buildFetchOptions('DELETE', session, {});
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
    return response.status;
};

export const useAuthDelete = async (url) => {
    const session = await getSession();
    const options = {
        method: 'DELETE',
        redirect: 'manual',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //Authorization: `Bearer ${Buffer.from(session.user.accessToken).toString('base64')}`,
            Authorization: `Bearer ${session.user.accessToken}`,
        },
    };

    const response = await fetch(url, options);
    return response;
};
