import React from 'react';
//Prime Components
import { Chip } from 'primereact/chip';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

//Custom Components
import { Search } from '@components/search';
import { ItemSummary } from '@components/itemsummary';

export const Inventory = (props) => {
    const {
        fields,
        options,
        usedIcon,
        endpoint,
        warehouse,
        usedLabel,
        showSearch,
        hideSearch,
        selectOption,
        searchVisible,
    } = { ...props };

    return (
        <Panel>
            <div className="p-fluid formgrid grid">
                <div className="field col-6">
                    <label>Nombre del Almacen</label>
                    <div className="p-inputgroup">
                        <InputText value={warehouse[fields.WAREHOUSE_NAME]} disabled />
                        <Button icon="pi pi-search" onClick={showSearch} />
                    </div>
                </div>
                <div className="field col-6">
                    <label>Estado</label>
                    <div className="flex justify-content-center flex-wrap">
                        <Chip label={usedLabel} icon={usedIcon} className="mr-2 mb-2 custom-chip" />
                    </div>
                </div>
            </div>
            <ItemSummary warehouseId={warehouse[fields.ID]} />
            <Search
                endpoint={endpoint}
                onHide={hideSearch}
                visible={searchVisible}
                selectOption={selectOption}
                fields={options.searchFields}
            />
        </Panel>
    );
};
