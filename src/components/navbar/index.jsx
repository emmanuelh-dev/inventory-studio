import React from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { signOut, useSession } from 'next-auth/react';
//components
import { Button } from 'primereact/button';
//hooks
import request from '@services/api';
const Userbar = (props) => {
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

    return <RightElement />;
};


export const Navbar = (props) => {
    const router = useRouter();
    const nav = [
        {
            label: 'Home',
            command: () => {
                router.push('/dashboard');
            },
            icon: 'pi pi-fw pi-home',
        },
        {
            label: 'Documentos',
            items: [
                {
                    label: 'Ingreso',
                    command: () => {
                        router.push('/reception');
                    },
                },
                {
                    label: 'Salidas',
                    command: () => {
                        router.push('/dispatch');
                    },
                },
            ],
        },
        {
            label: 'Entradas de inventario',
            items: [
                {
                    label: 'Compras',
                    command: () => {
                        router.push('/input-reception-list');
                    },
                },
                {
                    label: 'Devolucion por venta',
                    command: () => {
                        router.push('/sales-return-reception-list');
                    },
                },
            ],
        },
        {
            label: 'Salidas de inventario',
            items: [
                {
                    label: 'Ventas',
                    command: () => {
                        router.push('/output-dispatch-list');
                    },
                },
                {
                    label: 'Devolucion por compras',
                    command: () => {
                        router.push('/purchase-return-dispatch-list');
                    },
                },
            ],
        },
        {
            label: 'Configuracion',
            items: [
                {
                    label: 'Articulos',
                    command: () => {
                        router.push('/item-list');
                    },
                },
                {
                    label: 'Almacenes',
                    command: () => {
                        router.push('/warehouse-list');
                    },
                },
            ],
        },
        {
            label: 'Reporte',
            items: [
                {
                    label: 'Inventario',
                    command: () => {
                        router.push('/inventory');
                    },
                },
            ],
        },
    ];

    return (
        <div className="flex flex-column h-full">
            <Menubar model={nav} end={<Userbar/>}/>
        </div>
    );
};
