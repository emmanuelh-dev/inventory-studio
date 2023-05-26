import { useState, useEffect } from 'react';
import { useBarcodeSheet } from '@hooks/useBarcode';
//components
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { ToggleButton } from 'primereact/togglebutton';

export const BarcodeSheet = (props) => {
    const [disabled, setDisabled] = useState(false);
    const { quantity, visible, onHide, onYes } = { ...props };

    const {
        page,
        limit,
        onPage,
        addPage,
        removePage,
        clearLayout,
        updateLayout,
        firstRowByPage,
        labelSheetLayout,
    } = useBarcodeSheet(quantity);

    const ResetPageButton = () => {
        return (
            <Button
                onClick={clearLayout}
                icon="pi pi-refresh"
                label="Reiniciar Todo"
                className="p-button-outlined"
            />
        );
    };

    const AddPageButton = () => {
        return (
            <Button
                onClick={addPage}
                icon="pi pi-plus"
                label="Agregar Pagina"
                className="p-button-outlined p-button-success"
                disabled={limit}
            />
        );
    };

    const RemovePageButton = () => {
        return (
            <Button
                icon="pi pi-trash"
                disabled={disabled}
                onClick={removePage}
                label="Eliminar Pagina"
                className="p-button-outlined p-button-danger"
            />
        );
    };

    const actionButtons = () => {
        return (
            <div className="p-fluid formgrid grid">
                <div className="field col">
                    <ResetPageButton />
                </div>
                <div className="field col">
                    <AddPageButton />
                </div>
                <div className="field col">
                    <RemovePageButton />
                </div>
            </div>
        );
    };

    const onProcess = () => {
        const positions = labelSheetLayout.reduce((accumulator, value, index) => {
            value ? accumulator.push(index) : accumulator;
            return accumulator;
        }, []);
        onYes(positions);
        onHide();
    };

    const footer = (
        <div>
            <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={onProcess}
                className="p-button-success"
            />
            <Button
                onClick={onHide}
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-danger"
            />
        </div>
    );

    const createSheet = () => {
        const sheet = [];
        let button = null;
        for (let counter = 0; counter < 30; counter++) {
            const index = counter + page * 30;
            button = (
                <ToggleButton
                    key={counter}
                    checked={labelSheetLayout[index]}
                    className="col-4 barcode"
                    onLabel=" |||||||||||||||||||||||||||||||||||||||||||||||||||||| "
                    offLabel={`${index}`}
                    disabled={limit && !labelSheetLayout[index]}
                    onChange={(event) => {
                        updateLayout(event, index);
                    }}
                />
            );
            sheet.push(button);
        }

        return sheet;
    };

    useEffect(() => {
        setDisabled(labelSheetLayout.length == 30);
    }, [labelSheetLayout]);

    return (
        <Dialog
            header="Personalizar impresion de etiquetas"
            visible={visible}
            style={{ width: '70vw' }}
            footer={footer}
            onHide={onHide}
        >
            <Panel headerTemplate={actionButtons}>
                <div className="grid">{createSheet()}</div>
                <Paginator
                    rows={30}
                    onPageChange={onPage}
                    first={firstRowByPage}
                    totalRecords={labelSheetLayout.length}
                />
            </Panel>
        </Dialog>
    );
};
