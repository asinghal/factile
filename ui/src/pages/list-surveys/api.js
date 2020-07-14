import { getAuthHeader } from '../../authentication.js';

const getSurveys = async () => {
    let response = await fetch('/api/surveys', {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { getSurveys };
