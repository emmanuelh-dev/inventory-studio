import React from 'react';
import { Menu } from 'primereact/menu';
export const Navbar = (props) => {
    const nav = [
        {
            label: 'Home',
            url: '/',
            icon:'pi pi-fw pi-home',
        },
        {
            label: 'Documentos',
            items: [
                {
                    label: 'Ingreso',
                    url: '/reception',
                },
                {
                    label: 'Salidas',
                    url: '/dispatch',
                },
            ],
        },
        {
            label: 'Entradas de inventario',
            items: [
                {
                    label: 'Compras',
                    url: '/input-reception-list',
                },
                {
                    label: 'Devolucion por venta',
                    url: '/sales-return-reception-list',
                },
            ],
        },
        {
            label: 'Salidas de inventario',
            items: [
                {
                    label: 'Ventas',
                    url: '/output-dispatch-list',
                },
                {
                    label: 'Devolucion por compras',
                    url: '/purchase-return-dispatch-list',
                },
            ],
        },
    ];

    return <Menu model={nav} className="navbar"/>;
};
