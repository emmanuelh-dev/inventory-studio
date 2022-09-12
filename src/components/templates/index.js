import { findObjectByProp, findKey } from '@utils';
import { valuation } from '@constants/options';

//components
import { Chip } from 'primereact/chip';

export const ValuationType = (props) => {
    const { value } = { ...props };
    const element = findObjectByProp(valuation, 'value', value);
    return <Chip label={element.label} className="mr-2 mb-2 custom-chip" />;
};

export const UsedChip = (props) => {
    const { value } = { ...props };
    let label = 'Bloqueado';
    let icon = 'pi pi-lock';
    if (value) {
        label = 'Desbloqueado';
        icon = 'pi pi-lock-open';
    }
    return <Chip label={label} icon={icon} className="mr-2 mb-2 custom-chip" />;
};

export const amountTemplate = (row, field) => {
    const options = { style: 'currency', currency: 'USD' };
    const value = new Intl.NumberFormat('en-US', options).format(row[field]);
    return value;
};

export const quantityTemplate = (row, field) => {
    const value = new Intl.NumberFormat('en-US').format(row[field]);
    return value;
};

export const objectTemplate = (row, field) => {
    const key = findKey(row[field], 'Name');

    return row[field][key];
};
