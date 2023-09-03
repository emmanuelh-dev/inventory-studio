import { getSession } from 'next-auth/react';
import services from '@services/api-services';
import '@testing-library/jest-dom/extend-expect';
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    getSession: jest.fn(),
}));

jest.mock('@services/api-services');
const items = [
    {
        id: 1,
        itemName: 'item one',
        description: 'item one description',
        used: false,
        valuationType: 'AVERAGE',
        deleted: false,
    },
    {
        id: 2,
        itemName: 'item two',
        description: 'item two description',
        used: false,
        valuationType: 'AVERAGE',
        deleted: false,
    },
    {
        id: 3,
        itemName: 'item three',
        description: 'item three description',
        used: false,
        valuationType: 'AVERAGE',
        deleted: false,
    },
];
services.findAllItemsAsOption.mockReturnValueOnce(items);

const session = {
    user: {
        accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
            'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
            'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
};
getSession.mockReturnValueOnce(session);
