import { getAuthHeader } from '../../authentication.js';

const findSurvey = async (id, respId) => {
    const queryString = respId ? `?respId=${respId}` : '';
    let response = await fetch(`http://localhost:9000/public/surveys/${id}/render${queryString}`, {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

const saveResponse = async (surveyId, surveyResponse) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('http://localhost:9000/surveyresponses/surveys/' + surveyId + '/responses', {
        method: 'POST',
        headers,
        body: JSON.stringify(surveyResponse)
    });
    let data = await response.json();
    let status = await response.status;
    if (status !== 200) {
        console.log('something went wrong');
    }
    
    return data;
};

export { findSurvey, saveResponse };
