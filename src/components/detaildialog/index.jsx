import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
//custom compontents
import { ItemDropdown } from '@components/itemdropdown';
import { InputTextEditor } from '@components/inputtexteditor';
import { InputAmountEditor } from '@components/inputamounteditor';
import { InputQuantityEditor } from '@components/inputquantityeditor';

export const DetailDialog = (props) => {
    const {
        type,
        fields,
        visible,
        rowData,
        addDetail,
        warehouse,
        hideDialog,
        addButtonDisabled,
        updateRowDataField,
    } = {
        ...props,
    };

    const footer = () => {
        return <Footer onYes={addDetail} onCancel={hideDialog} disabled={addButtonDisabled} />;
    };

    return (
        <Dialog
            footer={footer()}
            visible={visible}
            onHide={hideDialog}
            style={{ width: '40vw' }}
            header="Agregar Articulos"
        >
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                    <label>Articulo</label>
                    <ItemDropdown
                        type={type}
                        row={rowData}
                        field={fields.ITEM}
                        warehouse={warehouse[fields.ID]}
                        updateField={updateRowDataField}
                    />
                </div>
                <div className="field col-12">
                    <label>Descripcion</label>
                    <InputTextEditor
                        row={rowData}
                        field={fields.DESCRIPTION}
                        updateField={updateRowDataField}
                    />
                </div>
                <div className="field col-12">
                    <label>Cantidad</label>
                    <InputQuantityEditor
                        row={rowData}
                        field={fields.QUANTITY}
                        updateField={updateRowDataField}
                        disable={false}
                    />
                </div>
                <div className="field col-12">
                    <label>Precio Unitario</label>
                    <InputAmountEditor
                        row={rowData}
                        field={fields.UNIT_PRICE}
                        updateField={updateRowDataField}
                        disable={false}
                    />
                </div>
                <div className="field col-12">
                    <label>Precio Total</label>
                    <InputAmountEditor row={rowData} field={fields.TOTAL_PRICE} disable={true} />
                </div>
            </div>
        </Dialog>
    );
};

const Footer = (props) => {
    const { onYes, onCancel, disabled } = { ...props };
    return (
        <div>
            <Button label="Aceptar" icon="pi pi-check" onClick={onYes} disabled={disabled} />
            <Button label="Cancelar" icon="pi pi-times" onClick={onCancel} />
        </div>
    );
};
