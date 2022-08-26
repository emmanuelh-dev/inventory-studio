import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

export const Search = (props) => {
    const [row, setRow] = useState();
    const { visible, onHide, data, fields, selectOption } = { ...props };
    const accept = () => {
        selectOption(row);
        onHide();
    };

    return (
        <Dialog
            header="Buscador"
            visible={visible}
            style={{ width: '50vw' }}
            footer={footer(accept, onHide)}
            onHide={onHide}
        >
            <DataTable
                value={data}
                selectionMode="single"
                selection={row}
                onSelectionChange={(event) => {
                    setRow(event.value);
                }}
                dataKey="id"
                responsiveLayout="scroll"
            >
                {fields.map((element) => {
                    return <Column key="id" field={element.field} header={element.header} />;
                })}
            </DataTable>
        </Dialog>
    );
};

const footer = (accept, cancel) => {
    return (
        <div>
            <Button label="Aceptar" icon="pi pi-check" onClick={accept} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancel} />
        </div>
    );
};
