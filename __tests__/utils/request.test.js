import { buildFetchOptions } from '@utils/request';
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
});
