import React, { useState } from 'react';
//constants
import { isArrayEmpty } from '@utils';
import { detailState } from '@constants';
import { detailsToolbar } from '@constants/options';
import { useRowData } from '@hooks/useFormState';
//components
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
//customs components
import { DetailDialog } from '@components/detaildialog';

export const Details = (props) => {
    const [visible, setVisible] = useState(false);

    const { rowData, clearRowData, updateRowData, updateRowDataField } = useRowData();

    const {
        data,
        fields,
        columns,
        editable,
        warehouse,
        selection,
        removeDetail,
        updateDetails,
        updateSelection,
    } = {
        ...props,
    };

    const filters = {
        deleted: { value: false, matchMode: FilterMatchMode.EQUALS },
    };

    const addDetail = () => {
        updateDetails({ ...rowData });
        hideDialog();
    };

    const selectionChange = (event) => {
        updateSelection(event.value);
    };

    const toolbar = () => {
        const onRemoveDetail = {
            command: removeDetail,
            state: isArrayEmpty(data) || editable,
        };

        const onAddDetail = {
            command: showDialog,
            state: editable,
        };

        const detailToolbar = createDetailToolbar(onAddDetail, onRemoveDetail);
        return <Menubar model={detailToolbar} />;
    };

    const actionTemplate = (rowData) => {
        const editDetail = () => {
            updateRowData(rowData);
            showDialog();
        };

        return (
            <Button
                icon="pi pi-pencil"
                onClick={editDetail}
                className="p-button-rounded p-button-success mr-2"
                disabled={editable}
            />
        );
    };

    //dialog
    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        clearRowData();
        setVisible(false);
    };

    const detailDialogProps = {
        fields,
        visible,
        rowData,
        addDetail,
        warehouse,
        hideDialog,
        updateRowDataField,
    };

    return (
        <Panel header={toolbar()}>
            <DataTable
                rows={10}
                paginator
                value={data}
                filters={filters}
                selection={selection}
                selectionMode="checkbox"
                onSelectionChange={selectionChange}
            >
                <Column selectionMode="multiple" className="col-1" />
                {columns.map((element) => {
                    return createColumn(element, 'lineNumber');
                })}
                <Column body={actionTemplate} />
            </DataTable>
            <DetailDialog {...detailDialogProps} className="col-1" />
        </Panel>
    );
};

const createDetailToolbar = (onAdd, onRemove) => {
    const _detailsToolbar = [...detailsToolbar];
    _detailsToolbar[0].command = onAdd.command;
    _detailsToolbar[0].disabled = onAdd.state;
    _detailsToolbar[1].command = onRemove.command;
    _detailsToolbar[1].disabled = onRemove.state;
    return _detailsToolbar;
};

const createColumn = (column, key) => {
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
};
