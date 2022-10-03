import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Dropdown } from 'primereact/dropdown';

export const ItemDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const { row, field, updateField } = { ...props };
    const endpoint = {
        suggestions: process.env.NEXT_PUBLIC_ITEMS_OPTIONS,
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
            optionLabel="itemName"
            placeholder="Seleccionar Articulos"
            onChange={(event) => updateField(field, event)}
        />
    );
};
