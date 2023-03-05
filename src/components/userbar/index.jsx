import { signOut } from 'next-auth/react';
import { Button } from 'primereact/button';
export const Userbar = (props) => {
    const handleSignoutClick = (event) => {};

    return (
        <>
            <Button
                label="Cerrar sesion"
                iconPos="left"
                icon="pi pi-sign-out"
                className="p-button-raised p-button-text p-button-plain"
                onClick={handleSignoutClick}
            />
        </>
    );
};
