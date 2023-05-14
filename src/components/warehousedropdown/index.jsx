import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import services from '@services/api-services';
export const WarehouseDropdown = (props) => {
    const [options, setOptions] = useState([]);
    const { state, field, updateField, trigger, disabled } = { ...props };

    const fetchData = async () => {
        const result = await services.findAllWarehousesAsOption();
        setOptions(result);
    };

    useEffect(() => {
        fetchData();
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
            disabled={disabled}
        />
    );
};
