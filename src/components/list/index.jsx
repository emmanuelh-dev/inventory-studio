import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isEmpty, replaceParams, transformFilter } from '@utils';
//custom components
import { Dashboard } from '@components/dashboard';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

export const List = (props) => {
    const [row, setRow] = useState();
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { type, filters, fields, redirect, getDataByPage, getDataAsPage, getDataByFilter } = {
        ...props,
    };

    const fetchDataAsPage = async () => {
        const result = await getDataAsPage(type);
        setFirst(0);
        setData(result);
        setLoading(false);
    };

    const fetchDataByPage = async (event) => {
        const result = await getDataByPage(event.page);
        setData(result);
        setFirst(event.first);
        setLoading(false);
    };

    const fetchDataByFilter = async (filter) => {
        const result = await getDataByFilter(filter);
        setFirst(0);
        setData(result);
        setLoading(false);
    };

    useEffect(() => {
        // useGet(`${endpoint.suggestions}?page=0&size=10`).then((data) => {
        //     setFirst(0);
        //     setData(data);
        //     setLoading(false);
        // });
        fetchDataAsPage();
    }, []);

    const onPage = (event) => {
        if (event.first !== first) {
            // useGet(`${endpoint.suggestions}?page=${event.page}&size=10`).then((data) => {
            //     setData(data);
            //     setFirst(event.first);
            //     setLoading(false);
            // });
            fetchDataByPage(event);
        }
    };

    const onFilter = (event) => {
        const filter = transformFilter(event.filters);
        if (!isEmpty(filter)) {
            // const url = replaceParams(endpoint.search, filter);
            // useGet(url).then((data) => {
            //     setFirst(0);
            //     setData(data);
            //     setLoading(false);
            // });
            fetchDataByFilter(filter);
        } else {
            // useGet(`${endpoint.suggestions}?page=0&size=10`).then((data) => {
            //     setFirst(0);
            //     setData(data);
            //     setLoading(false);
            // });

            fetchDataAsPage();
        }
    };

    const actionTemplate = (row) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        router.push(`${redirect}${row.id}`);
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
        <Dashboard>
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
        </Dashboard>
    );
};
