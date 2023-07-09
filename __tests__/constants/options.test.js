import { valuation } from '@constants/options';
import { toHaveValue } from '@testing-library/jest-dom/matchers';
describe('Options', () => {
    describe('valuation', () => {
        it('has only average valuation type as object', () => {
            const result = valuation[0];
            expect(valuation.length).toBe(1);
            expect(result.value).toBe('AVERAGE');
            expect(result.label).toBe('Promedio Ponderado');
        });
    });
});
