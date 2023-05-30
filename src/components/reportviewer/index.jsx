import { useState, useEffect } from 'react';
import services from '@services/api-services';
//components
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';

export const Viewer = (props) => {
    const [fileURL, setFileURL] = useState();
    const [loading, setLoading] = useState(true);
    const { body, document, visible, onHide, onYes } = { ...props };

    const fetchData = async () => {
        const response = await services.postBarcodeReport(document, body);
        setLoading(false);
        setFileURL(response);
    };

    useEffect(() => {
        if (visible) {
            fetchData();
        }
    }, [visible]);

    const Content = () => {
        if (loading) {
            return (
                <div className="flex justify-content-center flex-wrap">
                    <ProgressSpinner animationDuration=".5s" />
                </div>
            );
        }

        return <iframe src={fileURL} style={{ width: '100%', height: '100%' }}></iframe>;
    };

    return (
        <Dialog visible={visible} style={{ width: '80vw', height: '90%' }} onHide={onHide}>
            <Content />
        </Dialog>
    );
};
