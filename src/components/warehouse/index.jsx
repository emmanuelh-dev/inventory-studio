import React from 'react';
import services from '@services/api-services';

//Prime Components
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

//Custom Components
import { Search } from '@components/search';
import { Dashboard } from '@components/dashboard';

export const Warehouse = (props) => {
    const {
        fields,
        options,
        usedIcon,
        usedLabel,
        warehouse,
        showSearch,
        hideSearch,
        updateField,
        selectOption,
        notification,
        searchVisible,
    } = {
        ...props,
    };

    const toolbar = () => {
        return <Menubar model={options.toolbar} />;
    };

    const getDataByPage = async (page) => {
        const response = await services.findAllWarehousesByPage(page);

        return response;
    };

    const getDataAsPage = async () => {
        const response = await services.findAllWarehousesAsPage();

        return response;
    };

    return (
        <Dashboard>
            <Panel headerTemplate={toolbar}>
                <div className="">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-6">
                            <label>Nombre del Almacen</label>
                            <div className="p-inputgroup">
                                <InputText
                                    value={warehouse[fields.WAREHOUSE_NAME]}
                                    onChange={(event) => {
                                        updateField(fields.WAREHOUSE_NAME, event);
                                    }}
                                />
                                <Button icon="pi pi-search" onClick={showSearch} />
                            </div>
                        </div>
                        <div className="field col-6">
                            <label>Estado</label>
                            <div className="flex justify-content-center flex-wrap">
                                <Chip
                                    label={usedLabel}
                                    icon={usedIcon}
                                    className="mr-2 mb-2 custom-chip"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Toast ref={notification} />
                <Search
                    onHide={hideSearch}
                    visible={searchVisible}
                    selectOption={selectOption}
                    fields={options.searchFields}
                    getDataAsPage={getDataAsPage}
                    getDataByPage={getDataByPage}
                />
            </Panel>
        </Dashboard>
    );
};
