/**
 * Validate a given set of conditions before executing the given function
 * 
 * @param {array} conditions An array of conditions that must be true
 * @param {function} onSuccess function to be executed if all conditions are met
 * 
 * @returns {Promise}
 */
const validateInputs = (conditions, onSuccess) => {
    if (!conditions.reduce((r, c) => r && !!c, true)) {
        return new Promise((resolve, reject) => {
            reject('Something went wrong');
        });
    }

    return onSuccess();
}

module.exports = { validateInputs };