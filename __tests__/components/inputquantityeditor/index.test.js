import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { InputQuantityEditor } from '@components/inputquantityeditor';
describe('InputQuantityEditor', () => {
    const detail = {
        quantity: 0,
    };

    const updateFieldMock = jest.fn((field, event) => {
        detail[field] = event.value;
    });

    it('should be render', () => {
        const inputquantityeditorProps = {
            row: detail,
            field: 'quantity',
            updateField: updateFieldMock,
        };
        render(<InputQuantityEditor {...inputquantityeditorProps} />);
        const element = screen.getByRole('spinbutton');
        expect(element).toBeVisible();
    });
});
