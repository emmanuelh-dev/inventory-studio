import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isEmpty, replaceParams, transformFilter } from '@utils';

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

    const router = useRouter();
    const { fields, endpoint, filters } = { ...props };

    useEffect(() => {
        useGet(`${endpoint.suggestions}?page=0&size=10`).then((data) => {
            setFirst(0);
            setData(data);
            setLoading(false);
        });
    }, []);

    const onPage = (event) => {
        if (event.first !== first) {
            useGet(`${endpoint.suggestions}?page=${event.page}&size=10`).then((data) => {
                setData(data);
                setFirst(event.first);
                setLoading(false);
            });
        }
    };

    const onFilter = (event) => {
        const filter = transformFilter(event.filters);
        if (!isEmpty(filter)) {
            const url = replaceParams(endpoint.search, filter);
            useGet(url).then((data) => {
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

    const actionTemplate = (row) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        router.push(`${endpoint.redirect}/${row.id}`);
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => {}}
                />
            </React.Fragment>
        );
    };

    return (
        <DataTable
            lazy
            paginator
            stripedRows
            dataKey="id"
            first={first}
            selection={row}
            rows={data.size}
            loading={loading}
            filters={filters}
            onFilter={onFilter}
            filterDisplay="row"
            value={data.content}
            selectionMode="single"
            responsiveLayout="scroll"
            totalRecords={data.totalElements}
            onSelectionChange={(event) => {
                setRow(event.value);
            }}
            onPage={onPage}
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
