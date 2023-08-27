import { render, screen, fireEvent } from '@testing-library/react';
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

    it('should change value', () => {
        render(<InputQuantityEditor {...inputquantityeditorProps} />);
        const element = screen.getByRole('spinbutton');
        fireEvent.change(element, { target: { value: 5 } });
        expect(element).toBeVisible();
        expect(element.value).toBe('5');
    });

    it('should have format ###,####,###', () => {
        render(<InputQuantityEditor {...inputquantityeditorProps} />);
        const element = screen.getByRole('spinbutton');
        fireEvent.change(element, { target: { value: 1000000 } });
        fireEvent.blur(element);
        expect(element).toBeVisible();
        expect(element).toHaveValue('1,000,000');
    });

    it('should accept only integers values', () => {});
});
