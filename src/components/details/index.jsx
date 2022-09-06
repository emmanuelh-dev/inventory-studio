import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//constants
import { detailState } from '@constants';

import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';

export const Details = (props) => {
    const [first, setFirst] = useState(0);
    const [loading, setLoading] = useState(false);
    const { document, endpoint, fields, columns, data, detailToolbar, updateDetails } = {
        ...props,
    };

    const updateField = (element, field, value) => {
        element[field] = value.target.value;
        updateContent(element);
    };

    const updateContent = (element) => {
        const _data = { ...data };

        const _details = [..._data.content];

        const index = _details.findIndex((detail) => {
            return detail[fields.LINE_NUMBER] == element[fields.LINE_NUMBER];
        });

        if (index > -1) {
            _details[index] = element;

            _data.content = _details;
            updateDetails(_data);
        }
    };

    const toolbar = () => {
        return <Menubar model={detailToolbar} />;
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

    // useEffect(() => {
    //     useGet(
    //         `${endpoint.details}/type/${document[fields.TYPE]}/id/${
    //             document[fields.ID]
    //         }?page=0&size=10`
    //     ).then((data) => {
    //         setData(data);
    //         setFirst(0);
    //         setLoading(false);
    //     });
    // }, []);

    return (
        <Panel header={toolbar}>
            <DataTable
                value={data.content}
                selectionMode="single"
                // loading={loading}
                editMode="cell"
                // onPage={onPage}
                // lazy
                // paginator
            >
                {/* <Column
                    key="lineNumber"
                    field="lineNumber"
                    header="Line number"
                    editor={() => {}}
                ></Column> */}
                {columns.map((element) => {
                    if (element.editor !== undefined) {
                        return (
                            <Column
                                key="lineNumber"
                                field={element.field}
                                editor={(options) => {
                                    return element.editor(options, updateField);
                                }}
                                header={element.header}
                            />
                        );
                    }
                    return (
                        <Column key="lineNumber" field={element.field} header={element.header} />
                    );
                })}
            </DataTable>
        </Panel>
    );
};
