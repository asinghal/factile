import { getAuthHeader } from '../../authentication.js';

const getAddressbook = async () => {
    let response = await fetch('/api/addressbooks', {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 403) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { getAddressbook };