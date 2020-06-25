import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import Question from '../../components/surveys/questions/index.js';

export default function Participants() {
    const [participants, setParticipants] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setParticipants).catch(() => history.replace('/'));
    }, []);

    return (
        <div className="container">
            Found {participants.length} participants
        </div>
    );
};
