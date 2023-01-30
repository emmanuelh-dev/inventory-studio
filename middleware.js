import { NextResponse } from 'next/server';
import { useGet } from './src/hooks/useGet';
const middleware = async (request) => {
    const endpoint = {
        verifyOAuth: process.env.NEXT_PUBLIC_AUTH_VERIFY,
    };

    const jwt = request.cookies.get('access_token');
    if (jwt && jwt !== undefined) {
        try {
            const url = `${endpoint.verifyOAuth}${new URLSearchParams({ token: jwt })}`;
            const response = await useGet(url);
        } catch (error) {
            console.log('mensaje de error ', error);
        }
    }
    NextResponse.next();
};

export default middleware;
