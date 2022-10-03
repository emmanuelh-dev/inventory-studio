import { Dialog } from 'primereact/dialog';
//custom compontents
import { ItemDropdown } from '@components/itemdropdown';
import { InputTextEditor } from '@components/inputtexteditor';
import { InputAmountEditor } from '@components/inputamounteditor';
import { InputQuantityEditor } from '@components/inputquantityeditor';

export const DetailDialog = (props) => {
    const { visible, hideDialog, rowData, fields, updateField } = { ...props };
    // const footer = () => {
    //     return <Footer onYes={() => {}} onCancel={hideDialog} />;
    // };
    return (
        <Dialog style={{ width: '40vw' }} visible={visible} onHide={hideDialog}>
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                    <label>Articulo</label>
                    <ItemDropdown row={rowData} field={fields.ITEM} updateField={updateField} />
                </div>
                <div className="field col-12">
                    <label>Descripcion</label>
                    <InputTextEditor
                        row={rowData}
                        field={fields.DESCRIPTION}
                        updateField={updateField}
                    />
                </div>
                <div className="field col-12">
                    <label>Cantidad</label>
                    <InputQuantityEditor
                        row={rowData}
                        field={fields.QUANTITY}
                        updateField={updateField}
                        disable={false}
                    />
                </div>
                <div className="field col-12">
                    <label>Precio Unitario</label>
                    <InputAmountEditor
                        row={rowData}
                        field={fields.UNIT_PRICE}
                        updateField={updateField}
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
    const { onYes, onCancel } = { ...props };
    return (
        <div>
            <Button label="Aceptar" icon="pi pi-check" onClick={onYes} />
            <Button label="Cancelar" icon="pi pi-times" onClick={onCancel} />
        </div>
    );
};
