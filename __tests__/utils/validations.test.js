import { validateRepeatedItem, validateNotEmptyField, isReleasedOrUsed } from '@utils/validations';
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

    describe('validateNotEmptyField', () => {
        it('returns false if the value is empty', () => {
            const result = validateNotEmptyField('', 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the value is white space', () => {
            const result = validateNotEmptyField('   ', 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the value is null', () => {
            const result = validateNotEmptyField(null, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the value is undefined', () => {
            const result = validateNotEmptyField(undefined, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns true if the value has any valid string', () => {
            const result = validateNotEmptyField('valid string', 'name', () => {});
            expect(result).toBe(true);
        });
    });

    describe('isReleasedOrUsed', () => {
        it('returns true if row status is released', () => {
            const row = {
                status: 'RELEASED',
            };

            const result = isReleasedOrUsed(row);
            expect(result).toBe(true);
        });

        it('returns true if row used is true', () => {
            const row = {
                used: true,
            };

            const result = isReleasedOrUsed(row);
            expect(result).toBe(true);
        });

        it('returns false if row is not used', () => {
            const row = {
                used: false,
            };

            const result = isReleasedOrUsed(row);
            expect(result).toBe(false);
        });

        it('returns false if row is different to released', () => {
            const row = {
                status: 'OPEN',
            };

            const result = isReleasedOrUsed(row);
            expect(result).toBe(false);
        });
    });
});
