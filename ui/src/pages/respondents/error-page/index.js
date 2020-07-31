import React from "react";

import './error-page.css';

export default function PublicErrorPage() {
    return (
        <div className="container error-page">
            <div className="row">
                <div className="col-12">
                    <h1>Oops! This is embarrassing.</h1>
                    <p>An error has occured. This may also happen if you are trying to access a page that does not exist, or that you may not have access to. Please contact the administrators.</p>
                </div>
            </div>
        </div>
    )
};
