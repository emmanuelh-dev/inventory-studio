import { buildFetchOptions } from '@utils/request';
export const useDelete = async (url, session) => {
    const options = buildFetchOptions('DELETE', session, {});
    const response = await fetch(url, options);
    return response.status;
};

export const useAuthDelete = async (url, session) => {
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
