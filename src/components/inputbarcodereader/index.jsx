import { useState } from 'react';
import services from '@services/api-services';
import { InputText } from 'primereact/inputtext';
import { getValue, ifItemPresent, isObjectEmpty } from '@utils';

export const InputBarcodeReader = (props) => {
    const [barcode, setBarcode] = useState('');
    const { processBarcode, disabled } = { ...props };

    const readBarcode = async (value) => {
        processBarcode(value);
        setBarcode('');
    };

    const onChange = (event) => {
        const value = getValue(event);
        setBarcode(value);
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            readBarcode(barcode);
        }
    };

    return (
        <InputText
            value={barcode}
            onChange={onChange}
            disabled={disabled}
            onKeyDown={onKeyDown}
            className="p-inputtext-lg block"
        />
    );
};
