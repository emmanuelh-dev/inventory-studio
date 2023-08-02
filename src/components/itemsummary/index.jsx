import React, { useState, useEffect } from 'react';

import { itemSummaryFields } from '@constants';
//hooks
import services from '@services/api-services';
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

    const getDataAsPage = async (id) => {
        const result = await services.findAllItemSummaryByIdAsPage(id);
        setFirst(0);
        setData(result);
        setLoading(false);
    };

    const getDataByPage = async (event) => {
        const result = await services.findAllItemSummaryByIdByPage(warehouseId, event.page);
        setData(result);
        setFirst(event.first);
        setLoading(false);
    };

    useEffect(() => {
        if (warehouseId) {
            getDataAsPage(warehouseId);
        }
    }, [warehouseId]);

    const onPage = (event) => {
        setLoading(true);
        getDataByPage(event);
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
