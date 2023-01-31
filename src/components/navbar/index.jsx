import React from 'react';
import { Menu } from 'primereact/menu';

export const Navbar = (props) => {
    const nav = [
        {
            label:'Recepciones',
        },
        {
            label:'Salidas'
        }
    ]

    return <Menu model={nav} />
};
