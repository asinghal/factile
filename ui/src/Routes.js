import React from "react";
import {
    Switch,
    Route
  } from "react-router-dom";

  import Home from './pages/home/index.js';
  import ListSurveys from './pages/list-surveys/index.js';
  import NewSurvey from './pages/survey-editor/new-survey/index.js';
  import Questionnaire from './pages/survey-editor/questionnaire/index.js';
  import SurveyDashboard from './pages/dashboard/index.js';
  import PreviewSurvey from './pages/preview-survey/index.js';
  import SurveyResponses from './pages/survey-responses/index.js';
  import Participants from './pages/participants/index.js';
  import FAQ from './pages/static/faq/index.js';
  import Help from './pages/static/help/index.js';
  import ContactUs from './pages/static/contactus/index.js';
  import Features from './pages/static/features/index.js';
  import TermsAndConditions from './pages/static/termsandconditions/index.js';

  export default function Routes(userLoggedIn, setUserLoggedIn) {
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
                <Home setUserLoggedIn={setUserLoggedIn} />
            </Route>
            <Route exact path="/surveys">
                <ListSurveys />
            </Route>
            <Route exact path="/surveys/new">
                <NewSurvey />
            </Route>
            <Route exact path="/surveys/:id/questions">
                <Questionnaire />
            </Route>
            <Route exact path="/surveys/:id">
                <SurveyDashboard />
            </Route>
            <Route exact path="/surveys/:id/preview">
                <PreviewSurvey />
            </Route>
            <Route exact path="/surveys/:id/responses">
                <SurveyResponses />
            </Route>
            <Route exact path="/surveys/:id/participants">
                <Participants />
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
  