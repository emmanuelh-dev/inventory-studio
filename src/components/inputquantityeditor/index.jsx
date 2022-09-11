import { InputNumber } from 'primereact/inputnumber';

export const InputQuantityEditor = (props) => {
    const { row, field, updateField } = { ...props };
    return <InputNumber value={row[field]} onChange={(event) => updateField(row, field, event)} />;
};
