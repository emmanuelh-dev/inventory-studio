export const buildFetchOptions = (method, data) => {
    let options = {
        method: method,
        redirect: 'manual',
        mode: 'cors',
        cache: 'default',
    };

    if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': 'Location',
        };
    }

    return options;
};
