import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React, { useState, useRef } from 'react';
export const withAuthentication = (WrappedComponent) => (props) => {
    const router = useRouter();
    const message = useRef(null);

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
        const result = await signIn('credentials', {
            username: userAccount.username,
            password: userAccount.password,
            redirect: false,
        });
        if (result.ok) {
            router.push('dashboard');
        } else {
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
