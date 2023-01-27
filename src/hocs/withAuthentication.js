import React, { useState } from 'react';
import { useAuthPost } from '@hooks/usePost';
export const withAuthentication = (WrappedComponent) => (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const appCredentials = {
            client: 'InventoryStudio',
            secret: 'secreto'
        }
        const response = await useAuthPost('http://localhost:8180/inventory-item/oauth/token', appCredentials, credentials);
        console.log('token json: ', response);
    };

    const authenticationProps = {
        credentials,
        handleFormSubmit,
        handleInputChange,
    };

    return <WrappedComponent {...authenticationProps} />;
};
