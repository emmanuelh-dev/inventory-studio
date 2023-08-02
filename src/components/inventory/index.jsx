import React from 'react';
import services from '@services/api-services';
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
        warehouse,
        usedLabel,
        showSearch,
        hideSearch,
        selectOption,
        searchVisible,
    } = { ...props };

    const getDataAsPage = async () => {
        const result = await services.findAllWarehousesAsPage();
        return result;
    };

    const getDataByPage = async (page) => {
        const result = await services.findAllWarehousesByPage(page);
        return result;
    };

    const searchProps = {
        selectOption,
        getDataByPage,
        getDataAsPage,
        onHide: hideSearch,
        visible: searchVisible,
        fields: options.searchFields,
    };

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
            <Search {...searchProps} />
        </Panel>
    );
};
