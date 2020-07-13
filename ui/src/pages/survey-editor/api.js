import { getAuthHeader } from '../../authentication.js';

const saveOrUpdate = async (url, httpMethod, survey) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch(url, {
        method: httpMethod,
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

const save = async (survey) => {
    return saveOrUpdate('/api/surveys', 'POST', survey);
};

const update = async (survey) => {
    delete survey._id;
    return saveOrUpdate('/api/surveys/'+ survey.surveyId, 'PUT', survey);
};

const findSurvey = async (id) => {
    let response = await fetch('/api/surveys/' + id, {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

const sendEmails = async (id, formData) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('/api/surveys/' + id + '/invite', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
    });
    let data = await response.json();
    let status = await response.status;
    if (status !== 200) {
        console.log('something went wrong');
    }
    
    return data;
};

export { save, update, findSurvey, sendEmails };
