import { useState, useEffect } from 'react';
import { getValue } from '@utils';
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Paginator } from 'primereact/paginator';
import { ToggleButton } from 'primereact/togglebutton';

export const BarcodeSheet = (props) => {
    const [page, setPage] = useState(0);
    const [grid, setGrid] = useState([]);
    const [first, setFirst] = useState(0);
    const [pages, setPages] = useState(1);
    const [fullSheet, setFullSheet] = useState(false);
    const { elements } = { ...props };

    const onButtonClick = (event, index) => {
        const _grid = [...grid];
        _grid[index] = getValue(event);
        setGrid(_grid);
    };

    const onCheckBoxClick = (event) => {
        setFullSheet(event.checked);
    };

    const checkBox = () => {
        return (
            <div className="field-checkbox">
                <Checkbox inputId="fullSheet" checked={fullSheet} onChange={onCheckBoxClick} />
                <label htmlFor="fullSheet">Hojas restantes completas</label>
            </div>
        );
    };

    const onPage = (event) => {
        setPage(event.page);
        setFirst(event.first);
    };

    const calcNumberOfPages = () => {
        const _pages = Math.ceil(elements / 30);
        return _pages;
    };

    useEffect(() => {
        let _pages = calcNumberOfPages();
        let _labels = _pages * 30;
        setPages(_pages);
        setGrid(new Array(_labels).fill(false));
    }, []);

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
        <Panel header={checkBox}>
            <div className="grid">{createSheet()}</div>
            <Paginator first={first} rows={30} totalRecords={elements} onPageChange={onPage} />
        </Panel>
    );
};
