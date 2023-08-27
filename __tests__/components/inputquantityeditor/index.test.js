import { render, screen } from '@testing-library/react';
import { InputQuantityEditor } from '@components/inputquantityeditor';
describe('InputQuantityEditor', () => {
    const detail = {
        quantity: 0,
    };

    const updateFieldMock = jest.fn((field, event) => {
        detail[field] = event.value;
    });

    const inputquantityeditorProps = {
        row: detail,
        field: 'quantity',
        updateField: updateFieldMock,
    };

    it('should be render', () => {
        render(<InputQuantityEditor {...inputquantityeditorProps} />);
        const element = screen.getByRole('spinbutton');
        expect(element).toBeVisible();
        expect(element.value).toBe('0');
    });
});
