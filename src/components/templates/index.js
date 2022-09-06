import { findObjectByProp } from '@utils';
import { valuation } from '@constants/options';

//components
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

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

export const InputTextEditor = (props) => {
    const { row, field, updateField } = { ...props };
    return <InputText value={row[field]} onChange={(event) => updateField(row, field, event)} />;
};

export const InputAmountEditor = (props) => {
    const { row, field, updateField } = { ...props };
    return (
        <InputNumber
            value={row[field]}
            onChange={(event) => updateField(row, field, event)}
            mode="currency"
            currency="USD"
            locale="en-US"
        />
    );
};
