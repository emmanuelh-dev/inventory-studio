import React, { useState, useEffect } from 'react';

import { replaceParams } from '@utils';
import { itemSummaryFields } from '@constants';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export const ItemSummary = (props) => {
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(false);
    const { warehouseId } = { ...props };
    const { ITEM, QUANTITY, UNIT_PRICE, TOTAL_PRICE, LAST_UPDATED } = { ...itemSummaryFields };

    const endpoint = {
        inventory: process.env.NEXT_PUBLIC_ITEM_SUMMARY_FIND,
    };

    useEffect(() => {
        if (warehouseId) {
            const params = {
                id: warehouseId,
                page: 0,
            };

            const url = replaceParams(endpoint.inventory, params);
            useGet(url).then((response) => {
                setFirst(0);
                setData(response);
                setLoading(false);
            });
        }
    }, [warehouseId]);

    const onPage = (event) => {
        setLoading(true);
        const params = {
            id: warehouseId,
            page: event.page,
        };

        const url = replaceParams(endpoint.inventory, params);
        useGet(url).then((data) => {
            setData(data);
            setFirst(event.first);
            setLoading(false);
        });
    };

    return (
        <DataTable
            lazy
            paginator
            rows={20}
            first={first}
            onPage={onPage}
            loading={loading}
            value={data.content}
            totalRecords={data.totalElements}
        >
            <Column field={ITEM} header="Articulo" />
            <Column field={QUANTITY} header="Cantidad" />
            <Column field={UNIT_PRICE} header="Precio Unitario" />
            <Column field={TOTAL_PRICE} header="Precio Total" />
            <Column field={LAST_UPDATED} header="Fecha de Actualizacion" />
        </DataTable>
    );
};
