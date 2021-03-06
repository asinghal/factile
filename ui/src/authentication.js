const jwt = require('jsonwebtoken');

const localDB = {
    DB: {},
    getItem: (key) => localDB.DB[key],
    setItem: (key, value) => localDB.DB[key] = value,
    removeItem: (key) => delete localDB.DB[key]
};

const TOKEN_KEY = 'factile_token';

const store = window.sessionStorage || window.localStorage || localDB;

const getToken = () => store.getItem(TOKEN_KEY);

const isLoggedIn = () => {
    const token = getToken();

    const decoded = jwt.decode(token);
    const expired = decoded && (Date.now() >= decoded.exp * 1000);

    if (expired) {
        removeToken();
    }

    return !!decoded && !expired;
};

const getAuthHeader = () => new Headers({ 'Authorization': 'Bearer ' + getToken() })

const setToken = (value) => store.setItem(TOKEN_KEY, value);
const removeToken = () => store.removeItem(TOKEN_KEY);

module.exports = { getAuthHeader, setToken, removeToken, isLoggedIn };
