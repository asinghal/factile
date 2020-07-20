import { getAuthHeader } from '../../authentication.js';

const findSurvey = async (id) => {
    let response = await fetch('/api/surveyresponses/surveys/' + id, {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

const getExcelData = async (id) => {
    let response = await fetch('/api/surveyresponses/surveys/' + id + '/excel', {
        headers: getAuthHeader()
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

const generateReport = async (id, formData) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('/api/surveyresponses/surveys/' + id + '/analytics', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData)
    });
    let status = await response.status;
    if (status === 401) {
        throw new Error("unauthorized access");
    }
    let data = await response.json();
    return data;
};

export { findSurvey, getExcelData, generateReport };
