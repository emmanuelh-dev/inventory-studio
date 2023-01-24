import React, { useState } from 'react';
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

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    const authenticationProps = {
        credentials,
        handleFormSubmit,
        handleInputChange,
    };

    return <WrappedComponent {...authenticationProps} />;
};
