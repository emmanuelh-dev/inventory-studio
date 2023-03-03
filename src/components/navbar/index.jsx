import React from 'react';
import { useRouter } from 'next/router';
//components
import { Menu } from 'primereact/menu';
export const Navbar = (props) => {
    const router = useRouter();
    const nav = [
        {
            label: 'Home',
            command: () => {
                router.push('/');
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
    ];

    return <Menu model={nav} className="navbar" />;
};
