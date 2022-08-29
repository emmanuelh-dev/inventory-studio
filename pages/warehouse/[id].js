import { useState } from 'react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { ProgressSpinner } from 'primereact/progressspinner';
//custom components
import { Warehouse } from '@components/warehouse';
//hocs
import { withWarehouse } from '@hocs/withWarehouse';

const WarehouseForm = withWarehouse(Warehouse);
export default () => {
    const [warehouse, setWarehouse] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const endpoint = process.env.NEXT_PUBLIC_WAREHOUSES_SUGGESTIONS;

    useEffect(() => {
        if (id !== undefined) {
            useGet(`${endpoint}/${id}?page=0&size=10`).then((data) => {
                setWarehouse(data);
            });
        }
    }, [id]);

    if (warehouse == null) {
        return (
            <div className="flex justify-content-center flex-wrap">
                <ProgressSpinner animationDuration=".5s" />
            </div>
        );
    }
    return <WarehouseForm initialState={warehouse} />;
};
