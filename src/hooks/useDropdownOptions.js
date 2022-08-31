import { useState, useEffect } from 'react';
//hooks
import { useGet } from '@hooks/useGet';
export const useDropdownOptions = (url, label) => {
    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        useGet(url).then((data) => {
            const options = data.map((element) => {
                return { label: element[label], value: element };
            });
            setDropdownOptions(options);
        });
    }, []);

    return { dropdownOptions };
};
