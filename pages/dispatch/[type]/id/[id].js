import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
//utils
import { stringToDate, replaceParams } from '@utils';
//hooks
import { useGet } from '@hooks/useGet';
//custom components
import { MessageDialog } from '@components/messagedialog';
//components
import { ProgressSpinner } from 'primereact/progressspinner';
//hocs
import { withDispatch } from '@hocs/withDispatch';
const Dispatch = withDispatch;
export default () => {
    const [showDialog, setShowDialog] = useState(false);
    const [document, setDocument] = useState(null);
    const router = useRouter();
    const { type, id } = router.query;
    const endpoint = process.env.NEXT_PUBLIC_DISPATCHES_FIND;
    const messageDialogProps = {
        id,
        type,
        showDialog,
        onHideDialog: () => {
            setShowDialog(false);
            router.push(`/dispatch`);
        },
        
    };
    useEffect(() => {
        if (type && id) {
            const params = { type, id };
            const url = replaceParams(endpoint, params);
            useGet(url)
                .then((data) => {
                    const _document = stringToDate(data);
                    setDocument(_document);
                })
                .catch((error) => {
                    setShowDialog(true);
                });
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

    return (
        <React.Fragment>
            <Dispatch initialState={document} />
        </React.Fragment>
    );
};
