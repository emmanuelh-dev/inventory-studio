import { NextResponse } from 'next/server';
import { useGet } from '@hooks/useGet';
const middleware = async (request) => {
    const endpoint = {
        verifyOAuth: process.env.NEXT_PUBLIC_AUTH_VERIFY,
    };

    const jwt = request.cookies.get('access_token');
    if (jwt && jwt !== undefined) {
        const url = `${endpoint.verifyOAuth}${new URLSearchParams({ token: jwt })}`;
        const valid = validateToken(url);
    }
    NextResponse.next();
};

const validateToken = async (url)=>{
    try{
        const response = await useGet(url);
        return response.active;
    }catch(error){
        
        console.log('mensaje de error ', error);
    }
}

export default middleware;
