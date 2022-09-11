import { InputNumber } from 'primereact/inputnumber';

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
