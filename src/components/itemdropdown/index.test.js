import { DOCUMENT_TYPES } from '@constants';
import { ItemDropdown } from '@components/itemdropdown';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ItemDropdown', () => {
    const detail = {
        item: {},
    };

    const updateFieldMock = jest.fn();

    const itemDropDownProps = {
        row: detail,
        field: 'item',
        warehouse: 1,
        type: DOCUMENT_TYPES.INPUT,
        updateField: updateFieldMock,
    };

    it('should be render', async () => {
        render(<ItemDropdown {...itemDropDownProps} />);
        const element = await screen.findByTestId('item-dropdown');
        expect(element).toBeVisible();
    });
});
