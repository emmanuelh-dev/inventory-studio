import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
//components
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';

export const ItemDropdown = (props) => {
    const [options, setOptions] = useState([{ label: 'Kyoto', value: 'Kyoto' }]);
    const [loading, setLoading] = useState(true);

    const { row, field, updateField } = { ...props };
    const endpoint = {
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
    };

    const onLazyLoad = (event) => {
        setLoading(true);
        console.log('---->', event);
        useGet(`${endpoint.suggestions}?page=${event.page}&size=10`).then((data) => {
            console.log('---->', data);
            setOptions(data);
            setLoading(false);
        });
    };

    const scrollOptions = {
        lazy: true,
        itemSize: 10,
        showLoader: true,
        loading: loading,
        onLazyLoad: onLazyLoad,
        loadingTemplate: () => {
            return <LoadingTemplate />;
        },
    };

    useEffect(() => {
        useGet(`${endpoint.suggestions}?page=0&size=10`).then((data) => {
            console.log('===>', data);
            setOptions(data);
            setLoading(false);
        });
    }, []);

    return (
        <Dropdown
            options={options}
            value={row[field]}
            virtualScrollerOptions={scrollOptions}
            onChange={(event) => updateField(row, field, event)}
        />
    );
};

const LoadingTemplate = (props) => {
    return (
        <div className="flex align-items-center p-2" style={{ height: '38px' }}>
            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
        </div>
    );
};
