import { useState } from 'react';
import { getValue } from '@utils';
import { InputText } from 'primereact/inputtext';

export const InputBarcodeEditor = (props) => {
    const [barcode, setBarcode] = useState('');

    const { processBarcode } = { ...props };
    const onChange = (event) => {
        const value = getValue(event);
        setBarcode(value);
        if (value.match('/\n/g')) {
            processBarcode(value);
        }
    };

    return <InputText value={barcode} onChange={onChange} />;
};
