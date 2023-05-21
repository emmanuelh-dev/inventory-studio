import React from 'react';

import services from '@services/api-services';

//Prime Components
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Dashboard } from '@components/dashboard';
import { InputTextarea } from 'primereact/inputtextarea';

//Custom Components
import { Search } from '@components/search';

export const Item = (props) => {
    const {
        item,
        fields,
        options,
        usedIcon,
        usedLabel,
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
        const response = await services.findAllItemsByPage(page);

        return response;
    };

    const getDataAsPage = async () => {
        const response = await services.findAllItemsAsPage();

        return response;
    };

    return (
        <Dashboard>
            <Panel headerTemplate={toolbar}>
                <div className="">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-4">
                            <label>Nombre del Articulo</label>
                            <div className="p-inputgroup">
                                <InputText
                                    value={item[fields.ITEM_NAME]}
                                    onChange={(event) => {
                                        updateField(fields.ITEM_NAME, event);
                                    }}
                                />
                                <Button icon="pi pi-search" onClick={showSearch} />
                            </div>
                        </div>
                        <div className="field col-4">
                            <label>Metodo de valuacion</label>
                            <Dropdown
                                value={item[fields.VALUATION_TYPE]}
                                options={options.valuation}
                                onChange={(event) => {
                                    updateField(fields.VALUATION_TYPE, event);
                                }}
                            />
                        </div>
                        <div className="field col-4">
                            <label>Estado</label>
                            <div className="flex justify-content-center flex-wrap">
                                <Chip
                                    label={usedLabel}
                                    icon={usedIcon}
                                    className="mr-2 mb-2 custom-chip"
                                />
                            </div>
                        </div>
                        <div className="field col-12">
                            <label>Descripcion</label>
                            <InputTextarea
                                value={item[fields.DESCRIPTION]}
                                onChange={(event) => {
                                    updateField(fields.DESCRIPTION, event);
                                }}
                                rows={10}
                                cols={30}
                                autoResize
                            />
                        </div>
                    </div>
                </div>
                <Toast ref={notification} />
                <Search
                    visible={searchVisible}
                    onHide={hideSearch}
                    fields={options.searchFields}
                    selectOption={selectOption}
                    getDataAsPage={getDataAsPage}
                    getDataByPage={getDataByPage}
                />
            </Panel>
        </Dashboard>
    );
};
