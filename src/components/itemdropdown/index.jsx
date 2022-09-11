import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Dropdown } from 'primereact/dropdown';

export const ItemDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const { row, field, updateField } = { ...props };
    const endpoint = {
        suggestions: process.env.NEXT_PUBLIC_ITEMS_OPTIONS,
    };

    useEffect(() => {
        useGet(endpoint.suggestions).then((data) => {
            setOptions(data);
            setLoading(false);
        });
    }, []);

    return (
        <Dropdown
            options={options}
            value={row[field]}
            optionLabel="itemName"
            onChange={(event) => updateField(row, field, event)}
            placeholder="Seleccionar Articulos"
        />
    );
};
