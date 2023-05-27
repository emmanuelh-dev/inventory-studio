import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import services from '@services/api-services';
import { isNullOrUndefinedOrEmptyString } from '@utils';
//components
import { ProgressSpinner } from 'primereact/progressspinner';
//custom components
import { Item } from '@components/item';
//hocs
import { withItem } from '@hocs/withItem';

const ItemForm = withItem(Item);
export default () => {
    const [item, setItem] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const fetchData = async () => {
        if (!isNullOrUndefinedOrEmptyString(id)) {
            const response = await services.findItemById(id);
            setItem(response);
        }
    };

    useEffect(() => {
        fetchData();
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
