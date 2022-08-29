import { useState } from 'react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

//hooks
import { useGet } from '@hooks/useGet';

import { ProgressSpinner } from 'primereact/progressspinner';

import { Item } from '@components/item';
import { withItem } from '@hocs/withItem';
const ItemForm = withItem(Item);
export default () => {
    const [item, setItem] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const endpoint = process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS;

    useEffect(() => {
        if (id !== undefined) {
            useGet(`${endpoint}/${id}?page=0&size=10`).then((data) => {
                setItem(data);
            });
        }
    }, [id]);

    if (item == null) {
        return (
            <div className="flex justify-content-center flex-wrap">
                <ProgressSpinner animationDuration=".5s" />
            </div>
        );
    }
    return <ItemForm initialState={item} />;
};
