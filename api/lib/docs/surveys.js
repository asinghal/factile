
/**
 * @apiDefine SurveyView
 * 
 * @apiSuccess {String} surveyId  Survey ID of the survey to be retrieved
 * @apiSuccess {String} name Survey name
 * @apiSuccess {String} accessType Survey access type (one of: Open, Email)
 * @apiSuccess {String} status Survey status (one of: Draft, Live, Closed)
 * @apiSuccess {String} hash_string random string used to identify directory to keep associated artefacts
 * @apiSuccess {String} language Survey language
 * @apiSuccess {String} logo Logo URI
 * @apiSuccess {String[]} owner Array of email addresses for users that have a "write access" to this survey
 * @apiSuccess {String} thank_you_text "Thank you" text to act as the last page of the survey
 * @apiSuccess {String} uri Friendly URI for the survey
 * @apiSuccess {String} [intro_text] Survey introduction text to be used as a "welcome" page
 * @apiSuccess {Object} layout layout details
 * @apiSuccess {String} [layout[logoAlignment]] logo position (one of: left, right, center)
 * @apiSuccess {Boolean} [layout[includeProgress]] Include progress bar
 * @apiSuccess {String} [layout[bodycolor]] Main background color
 * @apiSuccess {String} [layout[containercolor]] Background color for main survey content
 * @apiSuccess {String} [layout[textColor]] Text Color
 * @apiSuccess {String} [layout[logoBgColor]] Logo background color
 * @apiSuccess {Object} history Change history
 * @apiSuccess {String} history[created_at] Timestamp when the survey was created
 * @apiSuccess {String} history[created_by] Email address of the user who created the survey
 * @apiSuccess {String} history[updated_at] Timestamp when the survey was last updated
 * @apiSuccess {String} history[updated_by] Email address of the user who last updated the survey
 * @apiSuccess {Object[]} pages Array of pages
 * @apiSuccess {Object[]} pages[questions] Array of questions
 * @apiSuccess {String} questions[questionId] Question Id
 * @apiSuccess {Object[]} questions[texts] Array of texts
 * @apiSuccess {String} questions[texts][text] Text
 * @apiSuccess {String} questions[texts][language] Language
 * @apiSuccess {String} questions[qType] question type
 * @apiSuccess {Boolean} questions[mandatory] Indicates if an answer is required for this question
 * @apiSuccess {Object[]} [questions[dimensions]] Only applicable for "ratings" questions. These form the rows on the table and warrant an answer.
 * @apiSuccess {Object[]} [questions[options]] List of options for radio, checkbox, ranking or ratings questions. In ratings, these form the columns.
 * @apiSuccess {Object[]} [dimensions[texts]] Array of texts
 * @apiSuccess {String} [dimensions[value]] value
 * @apiSuccess {Object[]} [options[texts]] Array of texts
 * @apiSuccess {String} [options[value]] value
 * @apiSuccess {String} [texts[text]] Text
 * @apiSuccess {String} [texts[language]] Language
 * @apiSuccess {Boolean} [questions[hasOther]] Show an "other" option and associated text box
 * @apiSuccess {Object} [questions[otherBox]] Label for the "other" text box
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "accessType": ".",
 *          "hash_string": ".",
 *          "history": {
 *              "created_at": ".",
 *              "created_by": ".",
 *              "updated_at": ".",
 *              "updated_by": "."
 *          },
 *          "intro_text": "",
 *          "language": ".",
 *          "layout": {
 *              "logoAlignment": ".",
 *              "includeProgress": true,
 *              "bodycolor": ".",
 *              "containercolor": ".",
 *              "textColor": ".",
 *              "logoBgColor": "."
 *          },
 *          "logo": ".",
 *          "name": ".",
 *          "owner": [
 *              ".", "."
 *          ],
 *          "status": ".",
 *          "surveyId": ".",
 *          "thank_you_text": ".",
 *          "uri": "",
 *          "pages": [
 *              {
 *                  "questions": [
 *                      {
 *                           "questionId": ".",
 *                           "texts": [
 *                              {
 *                                   "text": ".",
 *                                   "language": "."
 *                               }
 *                           ],
 *                           "mandatory": false,
 *                           "qType": "."
 *                      }
 *                  ]
 *              }
 *          ]
 *       }
 */
