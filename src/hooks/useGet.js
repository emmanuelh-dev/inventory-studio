export const useGet = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }

    const data = await response.json();
    return data;
};
