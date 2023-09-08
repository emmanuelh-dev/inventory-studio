import {
    findKey,
    getValue,
    isArrayEmpty,
    dateToString,
    stringToDate,
    ifItemPresent,
    replaceParams,
    isObjectEmpty,
    itemEvaluator,
    transformFilter,
    findItemOrEmpty,
    isInputDocument,
    isOutputDocument,
    findObjectByProp,
    isDispatchDocument,
    isNullOrUndefinedOrEmptyString,
} from '@utils';
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

    describe('stringToDate', () => {
        it('converts all string date to date type', () => {
            const todayDate = '03-07-2023 23:41:50.001';
            const dateOfTomorrow = '04-07-2023 12:30:10.012';
            const dateOfYestarday = '02-07-2023 16:21:59.150';
            const document = {
                id: 100,
                todayDate,
                dateOfTomorrow,
                dateOfYestarday,
            };
            const result = stringToDate(document);
            expect(result.id).toBe(100);
            expect(result.todayDate).toEqual(new Date(2023, 6, 3, 23, 41, 50, 1));
            expect(result.dateOfTomorrow).toEqual(new Date(2023, 6, 4, 12, 30, 10, 12));
            expect(result.dateOfYestarday).toEqual(new Date(2023, 6, 2, 16, 21, 59, 150));
        });

        it('returns the original object when there is not any date property', () => {
            const document = {
                id: 100,
                quantity: 20,
                status: 'OPEN',
            };
            const result = stringToDate(document);
            expect(result.id).toBe(100);
            expect(result.quantity).toBe(20);
            expect(result.status).toBe('OPEN');
            expect(result).toEqual(document);
        });
    });

    describe('getValue', () => {
        it('returns the value of property value', () => {
            const event = {
                value: 'valueOne',
            };
            const result = getValue(event);
            expect(result).toBe('valueOne');
        });

        it('returns the value of property target', () => {
            const event = {
                target: { value: 'valueOne' },
            };
            const result = getValue(event);
            expect(result).toBe('valueOne');
        });
    });

    describe('findKey', () => {
        it('returns the first key name that includes a value on its name', () => {
            const document = {
                id: 100,
                customerName: 'Omar',
                quantity: 1,
                colorName: 'red',
            };

            const result = findKey(document, 'Name');
            expect(result).toBe('customerName');
        });

        it('returns undefined when the name does not match with any property', () => {
            const document = {
                id: 100,
                customerName: 'Omar',
                quantity: 1,
                colorName: 'red',
            };

            const result = findKey(document, 'amount');
            expect(result).toBeUndefined();
        });
    });

    describe('replaceParams', () => {
        it('replaces url params with the values from object', () => {
            const url = 'https://localhost:8080/api/v1/{type}/id/{id}';
            const expected = 'https://localhost:8080/api/v1/OUTPUT/id/OUT00000000001';
            const params = {
                id: 'OUT00000000001',
                type: 'OUTPUT',
                quantity: 100,
                status: 'OPEN',
            };
            const result = replaceParams(url, params);
            expect(result).toBe(expected);
        });

        it('replaces the values that it found', () => {
            const url = 'https://localhost:8080/api/v1/{type}/id/{total}';
            const expected = 'https://localhost:8080/api/v1/OUTPUT/id/{total}';
            const params = {
                id: 'OUT00000000001',
                type: 'OUTPUT',
                quantity: 100,
                status: 'OPEN',
            };
            const result = replaceParams(url, params);
            expect(result).toBe(expected);
        });

        it('returns the original url if the object params is empty', () => {
            const url = 'https://localhost:8080/api/v1/{type}/id/{id}';
            const expected = 'https://localhost:8080/api/v1/{type}/id/{id}';
            const params = {
                quantity: 100,
                status: 'OPEN',
            };
            const result = replaceParams(url, params);
            expect(result).toBe(expected);
        });
    });

    describe('transformFilter', () => {
        it('gets filter object and returns basic object', () => {
            const filter = {
                age: { value: 16 },
                active: { value: true },
                name: { value: 'Batman' },
            };
            const expected = {
                age: 16,
                active: true,
                name: 'Batman',
            };
            const result = transformFilter(filter);
            expect(result).toEqual(expected);
        });
    });

    describe('isOutputDocument', () => {
        it('returns true if it is output', () => {
            const result = isOutputDocument('OUTPUT');
            expect(result).toBe(true);
        });

        it('returns false if it is not output', () => {
            const result = isOutputDocument('INPUT');
            expect(result).toBe(false);
        });
    });

    describe('isInputDocument', () => {
        it('returns true if it is input', () => {
            const result = isInputDocument('INPUT');
            expect(result).toBe(true);
        });

        it('returns fals if it is not input', () => {
            const result = isInputDocument('OUTPUT');
            expect(result).toBe(false);
        });
    });

    describe('isDispatchDocument', () => {
        it('returns true if it is an output document', () => {
            const result = isDispatchDocument('OUTPUT');
            expect(result).toBe(true);
        });

        it('returns true if it is a purchase return document', () => {
            const result = isDispatchDocument('PURCHASE_RETURN');
            expect(result).toBe(true);
        });

        it('returns false if it is a input document', () => {
            const result = isDispatchDocument('INPUT');
            expect(result).toBe(false);
        });

        it('returns false if it is a sales return document', () => {
            const result = isDispatchDocument('SALES_RETURN');
            expect(result).toBe(false);
        });
    });

    describe('isNullOrUndefinedOrEmptyString', () => {
        it('returns true if it is null', () => {
            const result = isNullOrUndefinedOrEmptyString(null);
            expect(result).toBe(true);
        });

        it('returns true if it is undefined', () => {
            const result = isNullOrUndefinedOrEmptyString(undefined);
            expect(result).toBe(true);
        });

        it('returns true if it is empty string', () => {
            const result = isNullOrUndefinedOrEmptyString('');
            expect(result).toBe(true);
        });

        it('returns true if it is empty space string', () => {
            const result = isNullOrUndefinedOrEmptyString(' ');
            expect(result).toBe(true);
        });
    });

    describe('itemEvaluator', () => {
        const fields = {
            ID: 'id',
            ITEM: 'item',
            DELETED: 'deleted',
            LINE_NUMBER: 'lineNumber',
        };

        const detail = {
            id: 10,
            lineNumber: 3,
            item: { id: 200 },
            deleted: false,
        };

        it('returns true if both objects dont have the same line number, they have the same item id and it is not marked as deleted', () => {
            const element = {
                id: null,
                lineNumber: 4,
                item: { id: 200 },
                deleted: false,
            };

            const result = itemEvaluator(fields, element, detail);
            expect(result).toBe(true);
        });

        it('returns false it the element is deleted', () => {
            const element = {
                id: null,
                lineNumber: 4,
                item: { id: 200 },
                deleted: true,
            };

            const result = itemEvaluator(fields, element, detail);
            expect(result).toBe(false);
        });

        it('returns false if they dont have the same item id', () => {
            const element = {
                id: null,
                lineNumber: 4,
                item: { id: 300 },
                deleted: false,
            };

            const result = itemEvaluator(fields, element, detail);
            expect(result).toBe(false);
        });
    });

    describe('ifItemPresent', () => {
        const fields = {
            ID: 'id',
            ITEM: 'item',
            DELETED: 'deleted',
            LINE_NUMBER: 'lineNumber',
        };

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

        it('it returns the object if the item already exist in the array but with different line number and not deleted', () => {
            const element = {
                id: null,
                lineNumber: 5,
                item: { id: 100 },
                deleted: false,
            };

            const expected = {
                id: 11,
                lineNumber: 1,
                item: { id: 100 },
                deleted: false,
            };

            const result = ifItemPresent(fields, details, element);
            expect(result).toEqual(expected);
        });

        it('it returns an empty object if the item already exist in the array with same line number and not deleted', () => {
            const element = {
                id: null,
                lineNumber: 1,
                item: { id: 100 },
                deleted: false,
            };
            const result = ifItemPresent(fields, details, element);
            expect(result).toEqual({});
        });

        it('it returns an empty object if the item already exist in the array with same line number and deleted', () => {
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

            const result = ifItemPresent(fields, details, element);
            expect(result).toEqual({});
        });
    });

    describe('findItemOrEmpty', () => {
        const details = [
            {
                id: 10,
                lineNumber: 3,
                item: { id: 200 },
                deleted: true,
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

        const detail = {
            id: null,
            lineNumber: 0,
            item: { id: 200 },
            deleted: false,
        };

        it('shoud be able to return empty object when the detail is not in the array', () => {
            const result = findItemOrEmpty([], detail);
            expect(result).toEqual({});
        });

        it('should be able to return empty object when the previous details is marked as deleted', () => {
            const result = findItemOrEmpty([], detail);
            expect(result).toEqual({});
        });
    });
});
