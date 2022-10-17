import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
//utils
import { stringToDate } from '@utils';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { ProgressSpinner } from 'primereact/progressspinner';
//hocs
import { withReception } from '@hocs/withReception';
const Reception = withReception;
export default () => {
    const [document, setDocument] = useState(null);
    const router = useRouter();
    const { type, id } = router.query;
    const endpoint = process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS;

    useEffect(() => {
        if (type !== undefined && id !== undefined) {
            useGet(`${endpoint}${type}/id/${id}`).then((data) => {
                const _document = stringToDate(data);
                setDocument(_document);
            });
        }
    }, [type, id]);

    if (document == null) {
        return (
            <div className="flex justify-content-center flex-wrap">
                <ProgressSpinner animationDuration=".5s" />
            </div>
        );
    }

    return <Reception initialState={document} />;
};
