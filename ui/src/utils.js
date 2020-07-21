const isValidEmail = (email) => !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

export { isValidEmail };