import React, { useEffect, useState } from 'react';
//utils
import { stringToDate } from '@utils';

//components
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

export const Search = (props) => {
    const [row, setRow] = useState();
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(true);
    const { visible, onHide, fields, selectOption, getDataAsPage, getDataByPage } = {
        ...props,
    };

    const fetchDataAsPage = async () => {
        if (visible) {
            const result = await getDataAsPage();
            setFirst(0);
            setData(result);
            setLoading(false);
        }
    };

    const fetchDataByPage = async (event) => {
        const result = await getDataByPage(event.page);
        setData(result);
        setFirst(event.first);
        setLoading(false);
    };

    useEffect(() => {
        fetchDataAsPage();
    }, [visible]);

    const onPage = (event) => {
        fetchDataByPage(event);
    };

    const onYes = () => {
        if (row != undefined) {
            selectOption(stringToDate(row));
        }

        onHide();
    };

    return (
        <Dialog
            header="Buscador"
            visible={visible}
            style={{ width: '50vw' }}
            footer={footer(onYes, onHide)}
            onHide={onHide}
        >
            <DataTable
                value={data.content}
                selectionMode="single"
                selection={row}
                onSelectionChange={(event) => {
                    setRow(event.value);
                }}
                dataKey="id"
                responsiveLayout="scroll"
                first={first}
                onPage={onPage}
                rows={data.size}
                totalRecords={data.totalElements}
                loading={loading}
                paginator
                lazy
            >
                {fields.map((element) => {
                    if (element.template !== undefined) {
                        return <Column key="id" body={element.template} header={element.header} />;
                    }
                    return <Column key="id" field={element.field} header={element.header} />;
                })}
            </DataTable>
        </Dialog>
    );
};

const footer = (onYes, onCancel) => {
    return (
        <div>
            <Button label="Aceptar" icon="pi pi-check" onClick={onYes} />
            <Button label="Cancelar" icon="pi pi-times" onClick={onCancel} />
        </div>
    );
};
