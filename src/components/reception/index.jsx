import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { WarehouseDropdown } from '@components/warehousedropdown';

export const Reception = (props) => {
    const {
        search,
        fields,
        options,
        details,
        document,
        endpoint,
        notification,
        updateDetails,
        // controlAmount,
        // controlQuantity,
        // updateControlAmount,
        // updateControlQuantity,
        updateDocumentField,
    } = { ...props };

    const { search: searchState, showSearch, hideSearch, selectOption } = { ...search };
    const toolbar = () => {
        return <Menubar model={options.documentToolbar} />;
    };

    return (
        <Panel header={toolbar}>
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
                        <Chip label="Abierto" className="mr-2 mb-2 " />
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
                    />
                </div>
                {/* <div className="field col-4">
                    <label>Control Monto Total</label>
                    <InputNumber
                        value={controlAmount}
                        onValueChange={updateControlAmount}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                    />
                </div> */}
                {/* <div className="field col-4">
                    <label>Control Cantidad Total</label>
                    <InputNumber value={controlQuantity} onValueChange={updateControlQuantity} />
                </div> */}
                <div className="field col-4">
                    <label>Almacen</label>
                    <WarehouseDropdown
                        state={document}
                        field={fields.WAREHOUSE}
                        updateField={updateDocumentField}
                    />
                </div>

                <div className="field col-4">
                    <label>Monto Total</label>
                    <InputNumber
                        value={document[fields.TOTAL_AMOUNT]}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        readOnly
                    />
                </div>
                <div className="field col-4">
                    <label>Cantidad Total</label>
                    <InputNumber value={document[fields.TOTAL_QUANTITY]} readOnly />
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
                    />
                </div>
            </div>
            <Details
                data={details}
                fields={fields}
                endpoint={endpoint}
                updateDetails={updateDetails}
                columns={options.detailTableFields}
                detailToolbar={options.detailToolbar}
            />
            <Search
                visible={searchState}
                onHide={hideSearch}
                fields={options.searchFields}
                selectOption={selectOption}
                endpoint={endpoint}
            />
            <Toast ref={notification} />
        </Panel>
    );
};