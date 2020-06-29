import { getAuthHeader } from '../../../authentication.js';

const save = async (survey) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    delete survey._id;

    let response = await fetch('http://localhost:9000/surveys/'+ survey.surveyId, {
        method: 'PUT',
        headers,
        body: JSON.stringify(survey)
    });
    let data = await response.json();
    let status = await response.status;
    if (status !== 200) {
        console.log('something went wrong');
    }
    
    return data;
};

const findSurvey = async (id) => {
    let response = await fetch('http://localhost:9000/surveys/' + id, {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { save, findSurvey };
