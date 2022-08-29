import { findObjectByProp } from '@utils';
import { valuation } from '@constants/options';

//components
import { Chip } from 'primereact/chip';

export const ValuationType = (props) => {
    const { value } = { ...props };
    const element = findObjectByProp(valuation, 'value', value);
    return <Chip label={element.label} className="mr-2 mb-2 custom-chip" />;
};
