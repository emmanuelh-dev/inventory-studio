// import { NextResponse } from 'next/server';
// import { useGet } from '@hooks/useGet';
// const middleware = async (request) => {
//     const endpoint = {
//         verifyOAuth: process.env.NEXT_PUBLIC_AUTH_VERIFY,
//     };
//     const pathname = request.nextUrl.pathname;
//     if (!(pathname.includes('_next') || pathname.includes('favicon') || pathname.includes("login"))) {
//         const jwt = request.cookies.get('access_token');
//         if (jwt && jwt !== undefined) {
//             const url = `${endpoint.verifyOAuth}${new URLSearchParams({ token: jwt })}`;
//             const valid = validateToken(url);
//         } else {
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     }
//     return NextResponse.next();
// };

// const validateToken = async (url) => {
//     try {
//         const response = await useGet(url);
//         return response.active;
//     } catch (error) {
//         console.log('mensaje de error ', error);
//     }
// };
const middleware = async (request) =>{}
export default middleware;
