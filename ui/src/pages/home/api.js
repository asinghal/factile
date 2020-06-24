import { setToken, removeToken } from '../../authentication';

const login = async (user) => {
    let response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    let data = await response.json();

    if (data.token) {
        setToken(data.token);
    } else {
        removeToken();
    }
    return data;
};

export { login };
