import { buildFetchOptions, buildAuthOptions } from '@utils/request';
describe('Request', () => {
    describe('buildFetchOptions', () => {
        const session = {
            user: {
                accessToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            },
        };

        const body = {
            id: 100,
            status: 'OPEN',
            quantity: 300,
        };

        it('returns options object for post request', () => {
            const expected = {
                method: 'POST',
                redirect: 'manual',
                mode: 'cors',
                cache: 'default',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.user.accessToken}`,
                    'Access-Control-Expose-Headers': 'Location',
                },
                body: JSON.stringify(body),
            };

            const result = buildFetchOptions('POST', session, body);
            expect(result).toEqual(expected);
        });

        it('returns options object for put request', () => {
            const expected = {
                method: 'PUT',
                redirect: 'manual',
                mode: 'cors',
                cache: 'default',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.user.accessToken}`,
                    'Access-Control-Expose-Headers': 'Location',
                },
                body: JSON.stringify(body),
            };

            const result = buildFetchOptions('PUT', session, body);
            expect(result).toEqual(expected);
        });

        it('returns options object for get request', () => {
            const expected = {
                method: 'GET',
                redirect: 'manual',
                mode: 'cors',
                cache: 'default',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            };

            const result = buildFetchOptions('GET', session, {});
            expect(result).toEqual(expected);
        });

        it('returns options object for delete request', () => {
            const expected = {
                method: 'DELETE',
                redirect: 'manual',
                mode: 'cors',
                cache: 'default',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            };

            const result = buildFetchOptions('DELETE', session, {});
            expect(result).toEqual(expected);
        });
    });

    describe('buildAuthOptions', () => {
        const credentials = {
            client: 'cliente',
            secret: 'supersecreto',
        };

        const data = {
            username: 'usuario@ejemplo.com',
            password: 'password123',
        };

        it('creates post options for authentication', () => {
            const { client, secret } = { ...credentials };
            const authorization = `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`;
            const expected = {
                mode: 'cors',
                method: 'POST',
                cache: 'default',
                redirect: 'manual',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Authorization: authorization,
                },
                body: new URLSearchParams({
                    username: data.username,
                    password: data.password,
                    grant_type: 'password',
                    scopes: 'read write',
                }),
            };

            const result = buildAuthOptions(credentials, data);
            expect(result).toEqual(expected);
        });
    });
});
