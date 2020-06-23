const getSurveys = async () => {
    let response = await fetch('http://localhost:9000/surveys');
    let data = await response.json();
    return data;
};

export { getSurveys };
