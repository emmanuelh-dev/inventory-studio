import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//constants
import { getValue } from '@utils';
//components
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';

export const Details = (props) => {
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(false);
    const {
        data,
        fields,
        columns,
        selection,
        updateSelection,
        detailToolbar,
        updateDocumentField,
    } = {
        ...props,
    };

    const filters = {
        deleted: { value: false, matchMode: FilterMatchMode.EQUALS },
    };

    const updateField = (element, field, event) => {
        element[field] = getValue(event);
        element = updateTotal(element, field);
        updateContent(element);
    };

    const updateTotal = (element, field) => {
        if (field == fields.UNIT_PRICE || field == fields.QUANTITY) {
            element[fields.TOTAL_PRICE] = element[fields.UNIT_PRICE] * element[fields.QUANTITY];
            return element;
        }
        return element;
    };

    const updateContent = (element) => {
        const _data = [...data];

        const index = _data.findIndex((detail) => {
            return detail[fields.LINE_NUMBER] == element[fields.LINE_NUMBER];
        });

        if (index > -1) {
            _data[index] = element;

            updateDocumentField(fields.DETAILS, { target: { value: _data } });
        }
    };

    const selectionChange = (event) => {
        updateSelection(event.value);
    };

    const onPage = (event) => {
        // useGet(
        //     `${endpoint.details}/type/${document[fields.TYPE]}/id/${document[fields.ID]}?page=${
        //         event.page
        //     }&size=10`
        // ).then((data) => {
        //     setData(data);
        //     setFirst(event.first);
        //     setLoading(false);
        // });
    };

    const toolbar = () => {
        return <Menubar model={detailToolbar} />;
    };

    return (
        <Panel header={toolbar}>
            <DataTable
                value={data}
                editMode="cell"
                filters={filters}
                dataKey="lineNumber"
                selection={selection}
                selectionMode="checkbox"
                onSelectionChange={selectionChange}
                // loading={loading}
                // onPage={onPage}
                // lazy
                // paginator
            >
                <Column selectionMode="multiple" className="col-1" />
                {columns.map((element) => {
                    return cell(element, updateField, 'lineNumber');
                })}
            </DataTable>
        </Panel>
    );
};

const cell = (column, updateField, key) => {
    if (column.editor !== undefined) {
        return (
            <Column
                key={key}
                className="col-2"
                field={column.field}
                header={column.header}
                editor={(options) => {
                    return column.editor(options, updateField);
                }}
                body={(row) => {
                    return column.body(row, column.field);
                }}
            />
        );
    } else {
        return (
            <Column
                key={key}
                className="col-2"
                field={column.field}
                header={column.header}
                body={(row) => {
                    return column.body(row, column.field);
                }}
            />
        );
    }
};
