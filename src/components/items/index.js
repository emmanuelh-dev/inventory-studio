import React, { useState } from 'react';

//Prime Components
import { Chip } from 'primereact/chip';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { InputTextarea } from 'primereact/inputtextarea';

export const Items = (props) => {
    const {
        item,
        updateField,
        fields,
        options,
        suggestions,
        filterSuggestions,
        autocompleteChange,
        autocompleteSelect,
        autocompleteBlur,
        usedIcon,
        usedLabel,
    } = {
        ...props,
    };

    return (
        <div className="">
            <div className="p-fluid formgrid grid">
                <div className="field col-4">
                    <label>Nombre del Articulos</label>
                    <AutoComplete
                        value={item[fields.ITEM_NAME]}
                        suggestions={suggestions}
                        field={fields.ITEM_NAME}
                        onChange={(event) => {
                            autocompleteChange(fields.ITEM_NAME, event);
                        }}
                        completeMethod={(event) => {
                            filterSuggestions(fields.ITEM_NAME, event);
                        }}
                        onSelect={autocompleteSelect}
                        onBlur={(event) => {
                            autocompleteBlur(fields.ITEM_NAME, event);
                        }}
                        dropdown
                    />
                </div>
                <div className="field col-4">
                    <label>Metodo de valuacion</label>
                    <Dropdown
                        value={item[fields.INVENTORY_METHOD]}
                        options={options.valuation}
                        onChange={(event) => {
                            updateField(fields.INVENTORY_METHOD, event);
                        }}
                    />
                </div>
                <div className="field col-4">
                    <label>Estado</label>
                    <div className="flex justify-content-center flex-wrap">
                        <Chip label={usedLabel} icon={usedIcon} className="mr-2 mb-2 custom-chip" />
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
    );
};
