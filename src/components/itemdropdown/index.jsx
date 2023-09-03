import { useState, useEffect } from 'react';
import services from '@services/api-services';
//components
import { Dropdown } from 'primereact/dropdown';

export const ItemDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const { row, field, updateField, warehouse, type } = { ...props };

    const fetchData = async () => {
        const result = await services.findAllItemsAsOption(type, warehouse);
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
            data-testid="item-dropdown"
            placeholder="Seleccionar Articulos"
            onChange={(event) => updateField(field, event)}
        />
    );
};
