import { useState, useEffect } from 'react';
import services from '@services/api-services';
//components
import { Dropdown } from 'primereact/dropdown';

export const ItemDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const { row, field, updateField } = { ...props };

    const fetchData = async () => {
        const result = await services.findAllItemsAsOption();
        setOptions(result);
    };

    useEffect(() => {
        fetchData();
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
