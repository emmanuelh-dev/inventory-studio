import React, { useState, useEffect } from 'react';

import { replaceParams } from '@utils';
import { itemSummaryFields } from '@constants';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
//customs components
import { objectTemplate, amountTemplate, quantityTemplate } from '@components/templates';

export const ItemSummary = (props) => {
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(false);
    const { warehouseId } = { ...props };
    const { KEY, ITEM, QUANTITY, UNIT_PRICE, TOTAL_PRICE, LAST_UPDATED } = { ...itemSummaryFields };

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
            <Column
                field={KEY}
                header="Articulo"
                body={(row) => {
                    return objectTemplate(row[KEY], ITEM);
                }}
            />
            <Column
                field={QUANTITY}
                header="Cantidad"
                body={(row) => {
                    return quantityTemplate(row, QUANTITY);
                }}
            />
            <Column
                field={UNIT_PRICE}
                header="Precio Unitario"
                body={(row) => {
                    return amountTemplate(row, UNIT_PRICE);
                }}
            />
            <Column
                field={TOTAL_PRICE}
                header="Precio Total"
                body={(row) => {
                    return amountTemplate(row, UNIT_PRICE);
                }}
            />
            <Column field={LAST_UPDATED} header="Fecha de Actualizacion" />
        </DataTable>
    );
};
