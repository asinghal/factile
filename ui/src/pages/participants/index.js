import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

export default function Participants() {
    const [participants, setParticipants] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setParticipants).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <div className="container">
            Found {participants.length} participants
        </div>
    );
};
