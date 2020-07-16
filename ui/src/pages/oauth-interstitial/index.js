import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { setToken } from "../../authentication";

export default function OAuthInterstitial() {
    const { token } = useParams();
    const history = useHistory();

    useEffect(() => {
        setToken(token);
        return history.replace('/surveys');
    });

    return (
        <div>
        </div>
    );
};
