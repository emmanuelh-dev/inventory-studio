import { validateRepeatedItem } from '@utils/validations';
describe('Validations', () => {
    describe('validateRepeatedItem', () => {
        const details = [
            {
                id: 10,
                lineNumber: 3,
                item: { id: 200 },
                deleted: false,
            },
            {
                id: 11,
                lineNumber: 1,
                item: { id: 100 },
                deleted: false,
            },
            {
                id: 12,
                lineNumber: 2,
                item: { id: 300 },
                deleted: false,
            },
        ];
        it('returns true if the object is in the array', () => {
            const element = {
                id: null,
                lineNumber: 5,
                item: { id: 100 },
                deleted: false,
            };

            const result = validateRepeatedItem(element, details, () => {});
            expect(result).toBe(true);
        });

        it('returns false if the object is not in the array', () => {
            const element = {
                id: null,
                lineNumber: 5,
                item: { id: 400 },
                deleted: false,
            };

            const result = validateRepeatedItem(element, details, () => {});
            expect(result).toBe(false);
        });

        it('returns false if the object is in the array as deleted', () => {
            const element = {
                id: null,
                lineNumber: 5,
                item: { id: 100 },
                deleted: false,
            };

            details[1] = {
                id: 11,
                lineNumber: 1,
                item: { id: 100 },
                deleted: true,
            };

            const result = validateRepeatedItem(element, details, () => {});
            expect(result).toBe(false);
        });
    });
});
