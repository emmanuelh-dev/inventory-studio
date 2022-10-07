import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Dropdown } from 'primereact/dropdown';

export const WarehouseDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const { state, field, updateField, trigger } = { ...props };
    const endpoint = {
        suggestions: process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS,
    };

    useEffect(() => {
        useGet(endpoint.suggestions).then((data) => {
            setOptions(data);
        });
    }, [trigger]);

    return (
        <Dropdown
            filter
            options={options}
            value={state[field]}
            optionLabel="warehouseName"
            placeholder="Seleccionar Almacen"
            onChange={(event) => {
                updateField(field, event);
            }}
        />
    );
};
