import { buildFetchOptions } from '@utils/request';

export const useDelete = async (url) => {
    const options = buildFetchOptions('DELETE', {});
    const response = await fetch(url, options);
    return response.status;
};
