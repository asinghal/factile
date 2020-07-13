import { getAuthHeader } from '../../authentication.js';

const update = async (password) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('http://localhost:9000/userdetails/password', {
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