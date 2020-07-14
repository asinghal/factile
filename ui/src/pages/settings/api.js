import { getAuthHeader } from '../../authentication.js';

const update = async (password) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('/api/userdetails/password', {
        method: 'PUT',
        headers,
        body: JSON.stringify({
            password
        })
    });
    let data = await response.json();
    return data;
};

export { update };