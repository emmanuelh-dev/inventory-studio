import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Dropdown } from 'primereact/dropdown';

export const WarehouseDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const { row, field, updateField } = { ...props };
    const endpoint = {
        suggestions: process.env.NEXT_PUBLIC_WAREHOUSES_OPTIONS,
    };

    useEffect(() => {
        useGet(endpoint.suggestions).then((data) => {
            setOptions(data);
        });
    }, []);

    return (
        <Dropdown
            filter
            options={options}
            value={row[field]}
            optionLabel="warehouseName"
            placeholder="Seleccionar Almacen"
            onChange={(event) => updateField(row, field, event)}
        />
    );
};
