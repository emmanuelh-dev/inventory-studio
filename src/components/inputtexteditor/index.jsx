import { InputText } from 'primereact/inputtext';

export const InputTextEditor = (props) => {
    const { row, field, updateField } = { ...props };
    return <InputText value={row[field]} onChange={(event) => updateField(row, field, event)} />;
};
