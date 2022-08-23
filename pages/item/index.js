import React, { useState } from 'react';

import { Chip } from 'primereact/chip';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { InputTextarea } from 'primereact/inputtextarea';

const Item = (props) => {
    const [item, setItem] = useState();
    const [inventory, setInvenotory] = useState();

    const cities = [
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' }
    ];

    return (
        <div className="">
            <div className="p-fluid formgrid grid">
                <div className="field col-4">
                    <label>Nombre del Articulos</label>
                    <AutoComplete value={item} dropdown />
                </div>
                <div className="field col-4">
                    <label>Metodo de evaluacion</label>
                    <Dropdown value={inventory} options={cities} onChange={() => { }} />
                </div>
                <div className="field col-4">
                    <label>Estado</label>
                    <div className="flex justify-content-center flex-wrap">
                        <Chip label="Desbloqueado" icon="pi pi-lock-open" className=" mr-2 mb-2 custom-chip" />
                    </div>
                </div>
                <div className="field col-12">
                    <label>Descripcion</label>
                    <InputTextarea value={inventory} onChange={() => { }} rows={10} cols={30} autoResize/>
                </div>
            </div>
        </div>
    );
}
export default Item;