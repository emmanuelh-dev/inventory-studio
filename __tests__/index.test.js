import { isObjectEmpty, isArrayEmpty, findObjectByProp, dateToString } from '@utils';
describe('Utils', () => {
    describe('isObjectEmpty', () => {
        it('returns true if object is empty', () => {
            const result = isObjectEmpty({});
            expect(result).toBe(true);
        });
        it('returns true if object is null', () => {
            const result = isObjectEmpty(null);
            expect(result).toBe(true);
        });
        it('returns true if object is undefined', () => {
            const result = isObjectEmpty(undefined);
            expect(result).toBe(true);
        });
    });

    describe('isArrayEmpty', () => {
        it('returns true if array is empty', () => {
            const result = isArrayEmpty([]);
            expect(result).toBe(true);
        });
        it('returns true if array is null', () => {
            const result = isArrayEmpty(null);
            expect(result).toBe(true);
        });
        it('returns true if array is undefined', () => {
            const result = isArrayEmpty(undefined);
            expect(result).toBe(true);
        });
    });

    describe('findObjectByProp', () => {
        it('returns empty object if array is empty', () => {
            const result = findObjectByProp([], 'name', 'Albus Dumbledore');
            expect(result).toEqual({});
        });
        it('returns empty object if array is null', () => {
            const result = findObjectByProp(null, 'name', 'Albus Dumbledore');
            expect(result).toEqual({});
        });
        it('returns empty object if array is undefined', () => {
            const result = findObjectByProp(undefined, 'name', 'Albus Dumbledore');
            expect(result).toEqual({});
        });

        it('returns object in the array if array has it', () => {
            const expected = {
                name: 'Albus Dumbledore',
                age: 100,
            };
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, 'name', 'Albus Dumbledore');
            expect(result).toEqual(expected);
        });
        it('returns empty object if the object is not present in array', () => {
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, 'name', 'Cedric Digory');
            expect(result).toEqual({});
        });
        it('returns empty object if the property does not exist', () => {
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, 'level', 10);
            expect(result).toEqual({});
        });

        it('returns empty object if the property is null', () => {
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, null, 10);
            expect(result).toEqual({});
        });
        it('returns empty object if the property is undefined', () => {
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, undefined, 10);
            expect(result).toEqual({});
        });

        it('returns empty object if the value is null', () => {
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, 'name', null);
            expect(result).toEqual({});
        });
        it('returns empty object if the value is undefined', () => {
            const wizards = [
                {
                    name: 'Ronald Weasley',
                    age: 16,
                },
                {
                    name: 'Harry Potter',
                    age: 16,
                },
                {
                    name: 'Hermione Granger',
                    age: 16,
                },
                {
                    name: 'Albus Dumbledore',
                    age: 100,
                },
            ];
            const result = findObjectByProp(wizards, 'name', undefined);
            expect(result).toEqual({});
        });
    });

    describe('dateToString', () => {
        it('converts all dates to string format', () => {
            const today = new Date(2023, 6, 3, 23, 41, 50, 0);
            const tomorrow = new Date(2023, 6, 4, 12, 30, 10, 12);
            const document = {
                id: 100,
                today,
                tomorrow,
            };
            const result = dateToString(document);
            expect(result.id).toBe(100);
            expect(result.today).toEqual('03-07-2023 23:41:50.000');
            expect(result.tomorrow).toEqual('04-07-2023 12:30:10.012');
        });

        it('returns original object if there is not a date value', () => {
            const document = {
                id: 100,
                quantity: 20,
                status: 'OPEN',
            };
            const result = dateToString(document);
            expect(result.id).toBe(100);
            expect(result.quantity).toBe(20);
            expect(result.status).toBe('OPEN');
            expect(result).toEqual(document);
        });
    });
});