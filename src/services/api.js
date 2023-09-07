import { signOut, getSession } from 'next-auth/react';
import { buildFetchOptions, buildAuthOptions } from '@utils/request';
const apiGet = async (url) => {
    const session = await getSession();
    const options = buildFetchOptions('GET', session, {});
    const response = await fetch(url, options);
    const body = await response.json();
    if (!response.ok) {
        await UnauthorizedHandleResponse(response, body);
    }
    return body;
};

const apiPost = async (url, body) => {
    const session = await getSession();
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

const apiPut = async (url, body) => {
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

const apiDelete = async (url) => {
    const session = await getSession();
    const options = buildFetchOptions('DELETE', session, {});
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
    return response.status;
};

const UnauthorizedHandleResponse = async (response, body) => {
    if (response.status == 401 || body.error == 'invalid_token') {
        await signOut({ callbackUrl: '/login' });
    }

    if (response.status != 401) {
        throw new Error(body.message);
    }
};

const apiAuthPost = async (url, credentials, body) => {
    const options = buildAuthOptions(credentials, body);
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }

    const data = await response.json();
    return data;
};

const apiAuthDelete = async (url) => {
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

const request = {
    apiGet,
    apiPut,
    apiPost,
    apiDelete,
    apiAuthPost,
    apiAuthDelete,
};

export default request;
