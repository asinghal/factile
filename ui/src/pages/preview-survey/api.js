const findSurvey = async (id) => {
    let response = await fetch('http://localhost:9000/surveys/' + id);
    let data = await response.json();
    return data;
};

export { findSurvey };
