import { useState, useEffect } from 'react';
import { getValue } from '@utils';
//components
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Paginator } from 'primereact/paginator';
import { ToggleButton } from 'primereact/togglebutton';

export const BarcodeSheet = (props) => {
    const [page, setPage] = useState(0);
    const [first, setFirst] = useState(0);
    const [grid, setGrid] = useState(new Array(30).fill(false));

    const onButtonClick = (event, index) => {
        const _grid = [...grid];
        _grid[index] = getValue(event);
        setGrid(_grid);
    };

    const addPage = () => {
        const newGrid = new Array(30).fill(false);
        const _grid = [...grid, ...newGrid];
        const newPage = page + 1;
        setGrid(_grid);
        setPage(newPage);
        setFirst(30 * newPage);
    };

    const addPageButton = () => {
        return <Button icon="pi pi-plus" label="Agregar Pagina" onClick={addPage} />;
    };

    const onPage = (event) => {
        setPage(event.page);
        setFirst(event.first);
    };

    const createSheet = () => {
        const sheet = [];
        for (let counter = 0; counter < 30; counter++) {
            const index = counter + page * 30;
            sheet.push(
                <ToggleButton
                    key={counter}
                    checked={grid[index]}
                    className="col-4 barcode"
                    onLabel=" |||||||||||||||||||||||||||||||||||||||||||||||||||||| "
                    offLabel={`${index}`}
                    onChange={(event) => {
                        onButtonClick(event, index);
                    }}
                />
            );
        }

        return sheet;
    };
    return (
        <Panel header={addPageButton}>
            <div className="grid">{createSheet()}</div>
            <Paginator first={first} rows={30} totalRecords={grid.length} onPageChange={onPage} />
        </Panel>
    );
};
