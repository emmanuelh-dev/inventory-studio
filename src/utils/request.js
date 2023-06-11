export const buildFetchOptions = (method, session, data) => {
    let options = {
        method: method,
        redirect: 'manual',
        mode: 'cors',
        cache: 'default',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
        },
    };

    if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(data);
        options.headers['Access-Control-Expose-Headers'] = 'Location';
    }

    return options;
};

export const buildAuthOptions = (credentials, data) => {
    const { client, secret } = { ...credentials };
    const { username, password } = { ...data };
    const options = {
        mode: 'cors',
        method: 'POST',
        cache: 'default',
        redirect: 'manual',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            username: username,
            password: password,
            grant_type: 'password',
            scopes: 'read write',
        }),
    };

    return options;
};
