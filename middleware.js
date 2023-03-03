import { withAuth } from 'next-auth/middleware';
const middleware = async (request) => {};
export default withAuth(middleware);
export const config = {
    matcher: [
        '/item',
        '/dispatch',
        '/reception',
        '/inventory',
        '/item-list',
        '/warehouse',
        '/warehouse-list',
        '/input-reception-list',
        '/output-dispatch-list',
        '/sales-return-reception-list',
        '/purchase-return-dispatch-list',
    ],
};
