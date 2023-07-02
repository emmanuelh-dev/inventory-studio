import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import { stringToDate } from '@utils';
import services from '@services/api-services';
import { Reception } from '@components/reception';
import { MessageDialog } from '@components/messagedialog';
import { ProgressSpinner } from 'primereact/progressspinner';

const ReceptionRedirection = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [document, setDocument] = useState(null);
    const router = useRouter();
    const { type, id } = router.query;
    const messageDialogProps = {
        id,
        type,
        showDialog,
        onHideDialog: () => {
            setShowDialog(false);
            router.push(`/reception`);
        },
    };

    const fetchData = async () => {
        if (type && id) {
            try {
                const response = await services.findReceptionDocumentById(type, id);
                const data = stringToDate(response);
                setDocument(data);
            } catch (error) {
                setShowDialog(true);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, id]);

    if (document == null) {
        return (
            <div className="flex justify-content-center flex-wrap">
                <ProgressSpinner animationDuration=".5s" />
                <MessageDialog {...messageDialogProps} />
            </div>
        );
    }

    return <Reception initialState={document} />;
};

export default ReceptionRedirection;
