import React from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { useMediaQuery } from '@hooks/useMediaQuery';
export const Navbar = (props) => {
    const router = useRouter();
    const small = useMediaQuery('(max-width: 768px)');
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

    return small ? <Menubar model={nav} /> : <Menu model={nav} className="col-12" />;
};
