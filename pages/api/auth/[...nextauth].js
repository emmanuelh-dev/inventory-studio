import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
//hooks
import { useAuthPost } from '@hooks/usePost';
export const authOptions = {
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(userAccount, req) {
                const { username, password } = { ...userAccount };
                const account = { username, password };
                const credentials = {
                    client: process.env.JWT_CLIENT,
                    secret: process.env.JWT_SECRET,
                };

                const response = await useAuthPost(
                    process.env.AUTHENTICATION,
                    credentials,
                    account
                );
                return response;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.accessToken = user.access_token;
                token.refreshToken = user.refresh_token;
                token.refreshToken = user.refresh_token;
                token.accessTokenExpires = user.expires_in;
            }
            return token;
        },
        async session({ token, session }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            return session;
        },
    },
};

export default NextAuth(authOptions);
