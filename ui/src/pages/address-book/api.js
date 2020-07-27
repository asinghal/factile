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

const saveAddressbook = async (addressbook) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('/api/addressbooks', {
        method: 'POST',
        headers,
        body: JSON.stringify(addressbook)
    });
    let status = await response.status;
    if (status === 403) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { getAddressbook, saveAddressbook };