import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
//utils
import { stringToDate } from '@utils';
//hooks
import { useGet } from '@hooks/useGet';
//custom components
import { MessageDialog } from '@components/messagedialog';
//components
import { ProgressSpinner } from 'primereact/progressspinner';
//hocs
import { withReception } from '@hocs/withReception';
const Reception = withReception;
export default () => {
    const [showDialog, setShowDialog] = useState(false);
    const [document, setDocument] = useState(null);
    const router = useRouter();
    const { type, id } = router.query;
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS;
    const messageDialogProps = {
        id,
        type,
        showDialog,
        onHideDialog: () => {
            setShowDialog(false);
            router.push(`/reception`);
        },
        
    };

    useEffect(() => {
        if (type !== undefined && id !== undefined) {
            useGet(`${endpoint}${type}/id/${id}`).then((data) => {
                const _document = stringToDate(data);
                setDocument(_document);
            })
            .catch((error) => {
                setShowDialog(true);
            });;
        }
    }, [type, id]);

    if (document == null) {
        return (
            <div className="flex justify-content-center flex-wrap">
                <ProgressSpinner animationDuration=".5s" />
                <MessageDialog {...messageDialogProps}/>
            </div>
        );
    }

    return <Reception initialState={document} />;
};
