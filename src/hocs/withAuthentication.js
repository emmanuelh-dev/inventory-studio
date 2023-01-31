import { useRouter } from 'next/router';
import React, { useState, useRef } from 'react';
//hook
import { useAuthPost } from '@hooks/usePost';
export const withAuthentication = (WrappedComponent) => (props) => {
    const router = useRouter();
    const message = useRef(null);

    const endpoint = {
        auth: process.env.NEXT_PUBLIC_AUTH,
    };

    const credentials = {
        client: process.env.NEXT_PUBLIC_CLIENT,
        secret: process.env.NEXT_PUBLIC_SECRET,
    };

    const [userAccount, setUserAccount] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setUserAccount({
            ...userAccount,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await useAuthPost(endpoint.auth, credentials, userAccount);
            const { access_token, refresh_token } = { ...response };
            document.cookie = `access_token=${access_token};`;
            document.cookie = `refresh_token=${refresh_token}`;
            router.push('reception');
        } catch (error) {
            showMessage();
        }
    };

    const showMessage = () => {
        message.current.show([
            {
                severity: 'error',
                summary: '',
                detail: 'Usuario o contraseña son incorrectos',
                sticky: true,
            },
        ]);
    };

    const authenticationProps = {
        message,
        userAccount,
        handleFormSubmit,
        handleInputChange,
    };

    return <WrappedComponent {...authenticationProps} />;
};
