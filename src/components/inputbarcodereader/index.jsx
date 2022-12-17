import { useState } from 'react';
import { useGet } from '@hooks/useGet';
import { getValue, replaceParams } from '@utils';
import { InputText } from 'primereact/inputtext';

export const InputBarcodeReader = (props) => {
    const [barcode, setBarcode] = useState('');
    const { processBarcode, documentType, disabled } = { ...props };
    const endpoint = {
        readBarcode: process.env.NEXT_PUBLIC_RECEPTIONS_READ_BARCODE,
    };

    const readBarcode = (value) => {
        const params = {
            type: documentType,
            barcode: value,
            format: 'CODE128',
        };
        const url = replaceParams(endpoint.readBarcode, params);
        useGet(url).then((data) => {
            processBarcode(data);
        });
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
            onKeyDown={onKeyDown}
            className="p-inputtext-lg block"
            disabled={disabled}
        />
    );
};
