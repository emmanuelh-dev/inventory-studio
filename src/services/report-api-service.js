import { replaceParams } from '@utils';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useDelete } from '@hooks/useDelete';

const postBarcodeReport = async (document, body) => {
    const endpoint = process.env.NEXT_PUBLIC_REPORT_BARCODE;
    const params = {
        id: document.id,
        type: document.type,
        barcodeType: 'CODE128',
        sheetType: 'OD5160',
    };
    const url = replaceParams(endpoint, params);
    const response = await usePost(url, body);
    const bytes = new Uint8Array(response);
    const file = new Blob([bytes], { type: 'application/pdf' });
    const link = URL.createObjectURL(file);

    return link;
};

const reportServices = {
    postBarcodeReport,
};

export default reportServices;
