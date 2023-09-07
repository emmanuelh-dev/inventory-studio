import React from 'react';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
//custom components
import { WarehouseDropdown } from '@components/warehousedropdown';

export const ReceptionForm = (props) => {
    const {
        fields,
        options,
        document,
        showSearch,
        isReleased,
        totalAmount,
        totalQuantity,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        updateControlAmountField,
        updateControlQuantityField,
    } = { ...props };

    return (
        <React.Fragment>
            <div className="p-fluid formgrid grid">
                <div className="field col-4">
                    <label>Folio</label>
                    <div className="p-inputgroup">
                        <InputText value={document[fields.ID] || ''} readOnly />
                        <Button icon="pi pi-search" onClick={showSearch} />
                    </div>
                </div>
                <div className="field col-4">
                    <label>Tipo</label>
                    <Dropdown
                        value={document[fields.TYPE]}
                        options={options.documentTypes}
                        onChange={(event) => {
                            updateDocumentField(fields.TYPE, event);
                        }}
                    />
                </div>
                <div className="field col-4">
                    <label>Estado</label>
                    <div className="flex justify-content-center flex-wrap">
                        <Chip label={isReleased ? 'Lberado' : 'Abierto'} className="mr-2 mb-2 " />
                    </div>
                </div>
                <div className="field col-4">
                    <label>Fecha</label>
                    <Calendar
                        value={document[fields.DATE]}
                        onChange={(event) => {
                            updateDocumentField(fields.DATE, event);
                        }}
                        dateFormat="dd-mm-yy"
                        hourFormat="12"
                        showTime
                        showSeconds
                        disabled={isReleased}
                    />
                </div>
                <div className="field col-4">
                    <label>Control Monto Total</label>
                    <InputNumber
                        value={controlAmountField}
                        onValueChange={updateControlAmountField}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        disabled={isReleased}
                    />
                </div>
                <div className="field col-4">
                    <label>Control Cantidad Total</label>
                    <InputNumber
                        value={controlQuantityField}
                        onValueChange={updateControlQuantityField}
                        disabled={isReleased}
                    />
                </div>
                <div className="field col-4">
                    <label>Almacen</label>
                    <WarehouseDropdown
                        state={document}
                        field={fields.WAREHOUSE}
                        trigger={document[fields.STATUS]}
                        updateField={updateDocumentField}
                        disabled={isReleased}
                    />
                </div>
                <div className="field col-4">
                    <label>Monto Total</label>
                    <InputNumber
                        value={totalAmount}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        readOnly
                        disabled={isReleased}
                    />
                </div>
                <div className="field col-4">
                    <label>Cantidad Total</label>
                    <InputNumber value={totalQuantity} disabled={isReleased} readOnly />
                </div>
                <div className="field col-12">
                    <label>Descripcion</label>
                    <InputTextarea
                        rows={10}
                        cols={30}
                        autoResize
                        value={document[fields.DESCRIPTION]}
                        onChange={(event) => {
                            updateDocumentField(fields.DESCRIPTION, event);
                        }}
                        disabled={isReleased}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
