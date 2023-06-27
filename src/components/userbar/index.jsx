import { signOut, useSession } from 'next-auth/react';
//components
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
//hooks
import request from '@services/api';
export const Userbar = (props) => {
    const { data: session } = useSession();
    const handleSignoutClick = async (event) => {
        event.preventDefault();
        const response = await request.apiAuthDelete(process.env.NEXT_PUBLIC_SIGNOUT, session);
        if (response.ok) {
            signOut({ callbackUrl: '/login' });
        }
    };
    const RightElement = () => (
        <Button
            label="Cerrar sesion"
            iconPos="left"
            icon="pi pi-sign-out"
            className="p-button-raised p-button-text p-button-plain"
            onClick={handleSignoutClick}
        />
    );

    return <Menubar model={[]} end={<RightElement />} />;
};
