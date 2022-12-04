import { useState, useEffect } from 'react';
import { getValue, replaceParams } from '@utils';
//hooks
import { usePost } from '@hooks/usePost';
//components
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { ToggleButton } from 'primereact/togglebutton';
import { ProgressSpinner } from 'primereact/progressspinner';

export const Viewer = (props) => {
    const [fileURL, setFileURL] = useState();
    const [loading, setLoading] = useState(true);
    const { params, body, endpoint, visible, onHide, onYes } = { ...props };

    useEffect(() => {
        if (visible) {
            const url = replaceParams(endpoint.barcode, params);
            usePost(url, body).then((data) => {
                const bytes = new Uint8Array(data);
                const file = new Blob([bytes], { type: 'application/pdf' });
                const link = URL.createObjectURL(file);
                setFileURL(link);
                setLoading(false);
            });
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

        return (
            <iframe
                src={fileURL}
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
            ></iframe>
        );
    };

    return (
        <Dialog visible={visible} style={{ width: '80vw', height: '90%' }} onHide={onHide}>
            <Content />
        </Dialog>
    );
};
