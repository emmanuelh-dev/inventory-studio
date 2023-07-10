import { valuation, receptionTypes, dispatchTypes, documentTypes } from '@constants/options';
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

    describe('dispatchTypes', () => {
        it('has two element in the array', () => {
            expect(dispatchTypes.length).toBe(2);
        });

        it('object of type output on the first place', () => {
            const result = dispatchTypes[0];
            expect(result.label).toBe('Salida');
            expect(result.value).toBe('OUTPUT');
        });

        it('object of type purchase return on the second place', () => {
            const result = dispatchTypes[1];
            expect(result.label).toBe('Devolucion por compra');
            expect(result.value).toBe('PURCHASE_RETURN');
        });
    });

    describe('documentTypes', () => {
        it('has ingreso, salida, devolucion por venta and devolucion por compra value for its keys', () => {
            expect(documentTypes.INPUT).toBe('Ingreso');
            expect(documentTypes.OUTPUT).toBe('Salida');
            expect(documentTypes.SALE_RETURN).toBe('Devolucion por venta');
            expect(documentTypes.PURCHASE_RETURN).toBe('Devolucion por compra');
        });
    });
});
