import React from "react";
import {
    Switch,
    Route
  } from "react-router-dom";

  import Home from './pages/home/index.js';
  import ListSurveys from './pages/list-surveys/index.js';
  import NewSurvey from './pages/new-survey/index.js';
  import PreviewSurvey from './pages/preview-survey/index.js';
  import FAQ from './pages/faq/index.js';
  import Help from './pages/help/index.js';
  import ContactUs from './pages/contactus/index.js';
  import Features from './pages/features/index.js';
  import TermsAndConditions from './pages/termsandconditions/index.js';

  export default function Routes() {
    return (
    <div>
        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
        */}
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/surveys">
                <ListSurveys />
            </Route>
            <Route exact path="/surveys/new">
                <NewSurvey />
            </Route>
            <Route exact path="/surveys/:id/preview">
                <PreviewSurvey />
            </Route>

            {/* Static files */}
            <Route exact path="/static/faq">
                <FAQ />
            </Route>
            <Route exact path="/static/help">
                <Help />
            </Route>
            <Route exact path="/static/contactus">
                <ContactUs />
            </Route>
            <Route exact path="/static/features">
                <Features />
            </Route>
            <Route exact path="/static/termsandconditions">
                <TermsAndConditions />
            </Route>
        </Switch>
    </div>
    );
  }
  