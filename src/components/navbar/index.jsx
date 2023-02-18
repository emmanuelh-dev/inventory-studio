import React from 'react';
import { Menu } from 'primereact/menu';

export const Navbar = (props) => {
    const nav = [
        {
            label:'Recepciones',
            url: '/reception'
        },
        {
            label:'Salidas',
            url: '/dispatch'
        }
    ]

    return <Menu model={nav} className="navbar"/>
};
