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
        const nextPage = page + 1;
        setGrid(_grid);
        setPage(nextPage);
        setFirst(30 * nextPage);
    };

    const removePage = () => {
        const lastPage = Math.ceil(grid.length / 30) - 1;
        const previousPage = lastPage - 1;
        const firstIndex = lastPage * 30;
        const _grid = [...grid];
        _grid.splice(firstIndex);
        setGrid(_grid);
        setPage(previousPage);
        setFirst(firstIndex - 30);
    };

    const AddPageButton = () => {
        return (
            <Button
                onClick={addPage}
                icon="pi pi-plus"
                label="Agregar Pagina"
                className="p-button-outlined"
            />
        );
    };

    const RemovePageButton = () => {
        return (
            <Button
                icon="pi pi-trash"
                onClick={removePage}
                label="Eliminar Pagina"
                className="p-button-outlined p-button-danger"
            />
        );
    };

    const actionButtons = () => {
        return (
            <div className="p-fluid formgrid grid">
                <div className="field col">
                    <AddPageButton />
                </div>
                <div className="field col">
                    <RemovePageButton />
                </div>
            </div>
        );
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
        <Panel headerTemplate={actionButtons}>
            <div className="grid">{createSheet()}</div>
            <Paginator first={first} rows={30} totalRecords={grid.length} onPageChange={onPage} />
        </Panel>
    );
};
