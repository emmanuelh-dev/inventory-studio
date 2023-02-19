import React from 'react';
import { documentTypes } from '@constants/options';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
export const MessageDialog = (props) => {
    const { id, type, showDialog, onHideDialog } = { ...props };
    const footer = () => {
        return (
            <div>
                <Button label="Aceptar" icon="pi pi-check" onClick={onHideDialog} autoFocus />
            </div>
        );
    };

    return (
        <Dialog
            header="Documento no encontrado"
            position="top"
            footer={footer}
            visible={showDialog}
            onHide={onHideDialog}
            style={{ width: '40%' }}
        >
            <p>
                Documento de tipo {documentTypes[type]} con el numero de folio {id} no fue encontrado en el sistema
            </p>
        </Dialog>
    );
};
