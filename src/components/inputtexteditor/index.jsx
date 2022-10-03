import { InputTextarea } from 'primereact/inputtextarea';

export const InputTextEditor = (props) => {
    const { row, field, updateField } = { ...props };
    return (
        <InputTextarea value={row[field]} onChange={(event) => updateField(row, field, event)} />
    );
};
