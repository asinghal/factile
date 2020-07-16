import { getAuthHeader } from '../../authentication.js';

const findSurvey = async (id, respId) => {
    const queryString = respId ? `?respId=${respId}` : '';
    let response = await fetch(`/api/public/surveys/${id}/render${queryString}`, {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

const sendResponseData = async (url, httpMethod, surveyResponse) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch(url, {
        method: httpMethod,
        headers,
        body: JSON.stringify(surveyResponse)
    });
    let data = await response.json();
    let status = await response.status;
    if (status !== 200) {
        console.log('something went wrong');
    }

    return data;
}

const saveResponse = (surveyId, responseId, surveyResponse) => {
    if (!responseId) {
        return sendResponseData(`/api/public/surveyresponses/surveys/${surveyId}/responses`, 'POST', surveyResponse);
    }

    return sendResponseData(`/api/public/surveyresponses/surveys/${surveyId}/responses/${responseId}`, 'PUT', surveyResponse);
};

const applyResponse = async (surveyId, responseId) => {

    let response = await fetch(`/api/public/surveys/${surveyId}/apply/responses/${responseId}`, {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { findSurvey, saveResponse, applyResponse };
