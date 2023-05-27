import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import services from '@services/api-services';
import { isNullOrUndefinedOrEmptyString } from '@utils';
//custom components
import { Warehouse } from '@components/warehouse';
//hocs
import { withWarehouse } from '@hocs/withWarehouse';
//components
import { ProgressSpinner } from 'primereact/progressspinner';

const WarehouseForm = withWarehouse(Warehouse);
export default () => {
    const [warehouse, setWarehouse] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const fetchData = async () => {
        if (!isNullOrUndefinedOrEmptyString(id)) {
            const response = await services.findWarehouseById(id);
            setWarehouse(response);
        }
    };

    useEffect(() => {
        fetchData();
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
