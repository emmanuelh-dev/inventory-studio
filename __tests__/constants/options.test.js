import { valuation, receptionTypes } from '@constants/options';
describe('Options', () => {
    describe('valuation', () => {
        it('has only average valuation type as object', () => {
            const result = valuation[0];
            expect(valuation.length).toBe(1);
            expect(result.value).toBe('AVERAGE');
            expect(result.label).toBe('Promedio Ponderado');
        });
    });

    describe('receptionTypes', () => {
        it('has two element in the array', () => {
            expect(receptionTypes.length).toBe(2);
        });

        it('object of type input on the first place', () => {
            const result = receptionTypes[0];
            expect(result.label).toBe('Ingreso');
            expect(result.value).toBe('INPUT');
        });

        it('object of type sales return on the second place', () => {
            const result = receptionTypes[1];
            expect(result.label).toBe('Devolucion por venta');
            expect(result.value).toBe('SALES_RETURN');
        });
    });
});
