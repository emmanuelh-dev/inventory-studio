import React, { useState } from 'react';
//constants
import { isArrayEmpty } from '@utils';
import { detailState } from '@constants';
import { detailsToolbar } from '@constants/options';
import { useFormState } from '@hooks/useFormState';
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
    const {
        state: detail,
        updateState: updateDetail,
        updateField: updateDetailField,
    } = useFormState({}, { ...detailState });

    const {
        data,
        fields,
        columns,
        released,
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
        const _detail = { ...detail };
        updateDetails(_detail);
        hideDialog();
    };

    const selectionChange = (event) => {
        updateSelection(event.value);
    };

    const toolbar = () => {
        const onRemoveDetail = {
            command: removeDetail,
            state: isArrayEmpty(data) || released,
        };

        const onAddDetail = {
            command: showDialog,
            state: released,
        };

        const detailToolbar = createDetailToolbar(onAddDetail, onRemoveDetail);
        return <Menubar model={detailToolbar} />;
    };

    const actionTemplate = (rowData) => {
        const editDetail = () => {
            updateDetail(rowData);
            showDialog();
        };

        return (
            <Button
                icon="pi pi-pencil"
                onClick={editDetail}
                className="p-button-rounded p-button-success mr-2"
                disabled={released}
            />
        );
    };

    //dialog
    const showDialog = () => {
        setVisible(true);
    };
    const hideDialog = () => {
        updateDetail({ ...detailState });
        setVisible(false);
    };

    const detailDialogProps = {
        fields,
        visible,
        addDetail,
        hideDialog,
        rowData: detail,
        updateField: updateDetailField,
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
