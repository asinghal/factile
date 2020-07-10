import { setToken, removeToken } from '../../authentication';

const post = async (url, payload) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    let data = await response.json();
    return data;
}

const login = async (user) => {
    let data = await post('http://localhost:9000/login', user);

    if (data.token) {
        setToken(data.token);
    } else {
        removeToken();
    }
    return data;
};

const register = async (user) => {
    let data = await post('http://localhost:9000/users', user);

    return data;
};

const forgotPassword = async (email) => {
    let data = await post('http://localhost:9000/users/forgotpassword', { email });

    return data;
};

export { login, register, forgotPassword };
