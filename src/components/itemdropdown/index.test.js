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

    it('should have three elements', async () => {
        render(<ItemDropdown {...itemDropDownProps} test="second" />);
        const dropdown = await screen.findByTestId('item-dropdown');
        fireEvent.click(dropdown);
        const options = await screen.findAllByText(/item/i);
        expect(options).toHaveLength(3);
        const itemOne = options[0];
        const itemTwo = options[1];
        const itemThree = options[2];
        expect(itemOne).toBeInTheDocument();
        expect(itemOne).toHaveTextContent('item one');
        expect(itemTwo).toBeInTheDocument();
        expect(itemTwo).toHaveTextContent('item two');
        expect(itemThree).toBeInTheDocument();
        expect(itemThree).toHaveTextContent('item three');
    });
});
