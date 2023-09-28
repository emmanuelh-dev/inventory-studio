import {
    isReleasedOrLocked,
    validateRepeatedItem,
    validateNotEmptyObjectField,
    validateNotEmptyStringField,
} from '@utils/validations';
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

    describe('validateNotEmptyStringField', () => {
        it('returns false if the value is empty', () => {
            const result = validateNotEmptyStringField('', 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the value is white space', () => {
            const result = validateNotEmptyStringField('   ', 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the value is null', () => {
            const result = validateNotEmptyStringField(null, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the value is undefined', () => {
            const result = validateNotEmptyStringField(undefined, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns true if the value has any valid string', () => {
            const result = validateNotEmptyStringField('valid string', 'name', () => {});
            expect(result).toBe(true);
        });
    });

    describe('validateNotEmptyObjectField', () => {
        it('should return false if the object is empty', () => {
            const value = {};
            const result = validateNotEmptyObjectField(value, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the object is null', () => {
            const result = validateNotEmptyObjectField(null, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns false if the object is undefined', () => {
            const result = validateNotEmptyObjectField(undefined, 'name', () => {});
            expect(result).toBe(false);
        });

        it('returns true if the object is valid', () => {
            const value = {
                name: 'Omar',
                lastName: 'Alvarez',
                age: 18,
            };
            const result = validateNotEmptyObjectField(value, 'name', () => {});
            expect(result).toBe(true);
        });
    });

    describe('isReleasedOrLocked', () => {
        it('returns true if row status is released', () => {
            const row = {
                status: 'RELEASED',
            };

            const result = isReleasedOrLocked(row);
            expect(result).toBe(true);
        });

        it('returns true if row locked is true', () => {
            const row = {
                locked: true,
            };

            const result = isReleasedOrLocked(row);
            expect(result).toBe(true);
        });

        it('returns false if row is not locked', () => {
            const row = {
                locked: false,
            };

            const result = isReleasedOrLocked(row);
            expect(result).toBe(false);
        });

        it('returns false if row is different to released', () => {
            const row = {
                status: 'OPEN',
            };

            const result = isReleasedOrLocked(row);
            expect(result).toBe(false);
        });
    });
});
