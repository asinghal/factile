import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Home from './pages/home/index.js';
import ListSurveys from './pages/list-surveys/index.js';
import NewSurvey from './pages/survey-editor/new-survey/index.js';
import Questionnaire from './pages/survey-editor/questionnaire/index.js';
import InviteSurveyUsers from "./pages/survey-editor/invitations/index.js";
import SurveyCollaborators from "./pages/survey-editor/collaborators/index.js";
import PreviewSurvey from './pages/respondents/preview-survey/index.js';
import LiveSurvey from "./pages/respondents/live-survey/index.js";
import SurveyResponses from './pages/survey-responses/summary/index.js';
import Participants from './pages/participants/index.js';
import FAQ from './pages/static/faq/index.js';
import Help from './pages/static/help/index.js';
import ContactUs from './pages/static/contactus/index.js';
import Features from './pages/static/features/index.js';
import TermsAndConditions from './pages/static/termsandconditions/index.js';
import EditorBase from "./pages/base-pages/editor-base/index.js";
import RespondentBase from "./pages/base-pages/respondent-base/index.js";
import PublicErrorPage from "./pages/respondents/error-page/index.js";
import Settings from "./pages/settings/index.js";
import OAuthInterstitial from "./pages/oauth-interstitial/index.js";
import SurveyAnalytics from "./pages/survey-responses/analytics/index.js";
import SurveySettings from "./pages/survey-editor/survey-settings/index.js";
import Addressbook from "./pages/address-book/index.js";

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
                <EditorBase>
                    <Home />
                </EditorBase>
            </Route>
            <Route exact path="/addressbook">
                <EditorBase secure="true">
                    <Addressbook />
                </EditorBase>
            </Route>
            <Route exact path="/surveys">
                <EditorBase secure="true">
                    <ListSurveys />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/new">
                <EditorBase secure="true">
                    <NewSurvey />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/edit">
                <EditorBase secure="true">
                    <NewSurvey />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/questions">
                <EditorBase secure="true">
                    <Questionnaire />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/invite">
                <EditorBase secure="true">
                    <InviteSurveyUsers />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/responses">
                <EditorBase secure="true">
                    <SurveyResponses />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/analytics">
                <EditorBase secure="true">
                    <SurveyAnalytics />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/participants">
                <EditorBase secure="true">
                    <Participants />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/collaborators">
                <EditorBase secure="true">
                    <SurveyCollaborators />
                </EditorBase>
            </Route>
            <Route exact path="/surveys/:id/settings">
                <EditorBase secure="true">
                    <SurveySettings />
                </EditorBase>
            </Route>

            <Route exact path="/user/preferences">
                <EditorBase secure="true">
                    <Settings />
                </EditorBase>
            </Route>

            <Route exact path="/oauth/:token">
                <OAuthInterstitial />
            </Route>

            {/* Respondent view */}
            <Route exact path="/surveys/:id/preview">
                <RespondentBase secure="true">
                    <PreviewSurvey />
                </RespondentBase>
            </Route>
            <Route exact path="/s/:id">
                <RespondentBase>
                    <LiveSurvey />
                </RespondentBase>
            </Route>
            <Route exact path="/s/:id/:respId">
                <RespondentBase>
                    <LiveSurvey />
                </RespondentBase>
            </Route>

            {/* Deprecated URLs */}
            <Route exact path="/surveys/:id/start">
                <RespondentBase>
                    <LiveSurvey />
                </RespondentBase>
            </Route>
            <Route exact path="/surveys/:id/:respId/start">
                <RespondentBase>
                    <LiveSurvey />
                </RespondentBase>
            </Route>

            {/* Static files */}
            <Route exact path="/static/faq">
                <EditorBase>
                    <FAQ />
                </EditorBase>
            </Route>
            <Route exact path="/static/help">
                <EditorBase>
                    <Help />
                </EditorBase>
            </Route>
            <Route exact path="/static/contactus">
                <EditorBase>
                    <ContactUs />
                </EditorBase>
            </Route>
            <Route exact path="/static/features">
                <EditorBase>
                    <Features />
                </EditorBase>
            </Route>
            <Route exact path="/static/termsandconditions">
                <EditorBase>
                    <TermsAndConditions />
                </EditorBase>
            </Route>

            <Route exact path="/error">
                <RespondentBase>
                    <PublicErrorPage />
                </RespondentBase>
            </Route>
        </Switch>
    </div>
    );
}
  