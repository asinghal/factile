const sendResponse = (res, httpStatusCode, payload) => {
    res.status(httpStatusCode);
    return res.send(payload);
};

module.exports = { sendResponse };