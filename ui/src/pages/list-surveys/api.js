import { getAuthHeader } from '../../authentication.js';

const getSurveys = async () => {
    let response = await fetch('http://localhost:9000/surveys', {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status == 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { getSurveys };
