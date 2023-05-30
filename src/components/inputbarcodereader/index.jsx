import { useState } from 'react';
import { getValue } from '@utils';
import services from '@services/api-services';
import { MESSAGE_TYPES, detailState } from '@constants';
import { InputText } from 'primereact/inputtext';

export const InputBarcodeReader = (props) => {
    const [barcode, setBarcode] = useState('');
    const { processBarcode, disabled, warehouse, showNotification } = { ...props };

    const readBarcode = async (value) => {
        const detail = { ...detailState };
        try {
            const response = await services.findDispatchDetailReadingBarcode(warehouse, value);
            detail.quantity = 1;
            detail.item = response.item;
            detail.unitPrice = response.unitPrice;
            detail.totalPrice = response.unitPrice;
            detail.description = response.description;
            processBarcode(detail);
            setBarcode('');
        } catch (error) {
            showNotification(MESSAGE_TYPES.ERROR, error.message);
        }

        // const params = {
        //     warehouse,
        //     type: documentType,
        //     barcode: value,
        //     format: 'CODE128',
        // };
        // const url = replaceParams(endpoint.readBarcode, params);
        // useGet(url)
        //     .then((data) => {
        // detail.item = data.item;
        // detail.quantity = 1;
        // detail.unitPrice = data.unitPrice;
        // detail.totalPrice = data.unitPrice;
        // detail.description = data.description;
        // processBarcode(detail);
        // setBarcode('');
        //     })
        //     .catch((error) => {
        //         showNotification('error', error.message);
        //     });
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
