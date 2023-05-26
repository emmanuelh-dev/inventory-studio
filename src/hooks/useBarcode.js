import { useState, useEffect } from 'react';
import { getValue } from '@utils';
export const useBarcodeSheet = (quantity) => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(false);
    const [counter, setCounter] = useState(0);
    const [firstRowByPage, setFirstRowByPage] = useState(0);
    const [labelSheetLayout, setLabelSheetLayout] = useState(new Array(30).fill(false));

    const updateLayout = (event, index) => {
        const layout = [...labelSheetLayout];
        const value = getValue(event);
        layout[index] = value;
        setLabelSheetLayout(layout);
        updateCounter(value);
    };

    const updateCounter = (value) => {
        const newValue = value ? counter + 1 : counter - 1;
        setCounter(newValue);
    };

    const onPage = (event) => {
        setPage(event.page);
        setFirstRowByPage(event.first);
    };

    const addPage = () => {
        const newPage = new Array(30).fill(false);
        const layout = [...labelSheetLayout, ...newPage];
        const nextPage = page + 1;
        setLabelSheetLayout(layout);
        setPage(nextPage);
        setFirstRowByPage(30 * nextPage);
    };

    const removePage = () => {
        const lastPage = Math.ceil(labelSheetLayout.length / 30) - 1;
        const newLastPage = lastPage - 1;
        const firstIndexOfLastPage = lastPage * 30;
        const layout = [...labelSheetLayout];
        layout.splice(firstIndexOfLastPage);
        setLabelSheetLayout(layout);
        setPage(newLastPage);
        setFirstRowByPage(firstIndexOfLastPage - 30);
    };

    const clearLayout = () => {
        const layout = new Array(30).fill(false);
        setPage(0);
        setCounter(0);
        setLimit(false);
        setLabelSheetLayout(layout);
        setFirstRowByPage(0);
    };

    useEffect(() => {
        setLimit(counter == quantity);
    }, [counter]);

    useEffect(() => {
        clearLayout();
    }, [quantity]);

    return {
        page,
        limit,
        onPage,
        addPage,
        removePage,
        clearLayout,
        updateLayout,
        firstRowByPage,
        labelSheetLayout,
    };
};
