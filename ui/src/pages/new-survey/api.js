import { getAuthHeader } from '../../authentication.js';

const save = async (survey) => {
    const headers = getAuthHeader();
    headers.append('Content-Type', 'application/json');

    let response = await fetch('http://localhost:9000/surveys', {
        method: 'POST',
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

export { save };
