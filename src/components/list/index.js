import React, { useEffect, useState } from 'react';

//hooks
import { useGet } from '@hooks/useGet';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

export const List = (props) => {
    const [row, setRow] = useState();
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(true);
    const { fields, endpoint, filters } = { ...props };

    useEffect(() => {
        useGet(`${endpoint.suggestions}?page=0&size=10`).then((data) => {
            setFirst(0);
            setData(data);
            setLoading(false);
        });
    }, []);

    const onPage = (event) => {
        useGet(`${endpoint.suggestions}?page=${event.page}&size=10`).then((data) => {
            setData(data);
            setFirst(event.first);
            setLoading(false);
        });
    };
    const onFilter = (event) => {
        const filterValue = Object.values(event.filters)[0].value;
        if (filterValue) {
            useGet(`${endpoint.search}/${filterValue}?page=0&size=10`).then((data) => {
                setFirst(0);
                setData(data);
                setLoading(false);
            });
        } else {
            useGet(`${endpoint.suggestions}?page=0&size=10`).then((data) => {
                setFirst(0);
                setData(data);
                setLoading(false);
            });
        }
    };

    return (
        <DataTable
            value={data.content}
            selectionMode="single"
            selection={row}
            onSelectionChange={(event) => {
                setRow(event.value);
            }}
            dataKey="id"
            filterDisplay="row"
            filters={filters}
            responsiveLayout="scroll"
            first={first}
            onPage={onPage}
            rows={data.size}
            totalRecords={data.totalElements}
            onFilter={onFilter}
            loading={loading}
            lazy
            paginator
            stripedRows
        >
            {fields.map((element) => {
                if (element.template !== undefined) {
                    return <Column key="id" body={element.template} header={element.header} />;
                } else if (element.filter) {
                    return (
                        <Column
                            key="id"
                            field={element.field}
                            header={element.header}
                            filterPlaceholder={`Buscar por ${element.header}`}
                            filter
                        />
                    );
                }
                return <Column key="id" field={element.field} header={element.header} />;
            })}
            <Column body={actionTemplate} />
        </DataTable>
    );
};

const actionTemplate = (row) => {
    return (
        <React.Fragment>
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => {}}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-warning"
                onClick={() => {}}
            />
        </React.Fragment>
    );
};
