const login = async (user) => {
    let response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    let data = await response.json();
    return data;
};

export { login };
