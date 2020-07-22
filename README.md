### Welcome to Factile!

[![Join the chat at https://gitter.im/asinghal/factile](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/asinghal/factile?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![CircleCI](https://circleci.com/gh/asinghal/factile.svg?style=shield)](https://app.circleci.com/pipelines/github/asinghal/factile)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/asinghal/factile/graphs/commit-activity)
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m785566480-fb4f6c6bad50b3f63d62ec1a?label=website%20status)](https://status.factile.net/785566480)
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m785566474-ea0217b241d62839a85afdb6?label=API%20status)](https://status.factile.net/785566474)


Factile is an online survey platform that enables market research and insights into data. This is an open source tool and available for free for all purposes. 

The only thing I must ask for is that you give the due credits to Factile when using it. And please feel free to Tweet about it, share it with your friends and colleagues or write blogs about it! Publicity is more than welcome, ofcourse!

## License

The tool and its source code are available under MIT license (https://opensource.org/licenses/MIT). Your contributions are most welcome.

## Features

1. Design a survey with multiple pages and multiple questions, just as fast as you can type :-). 
1. The different question types that are available are:
    1. Text boxes
    1. Radio buttons
    1. Check boxes
    1. Combo boxes (dropdowns)
    1. Text areas
    1. Plain texts
    1. more to come ...
1. Preview a survey before sending it out.
1. Surveys are based on Twitter Bootstrap's responsive design so they work on various devices.
    1. Natural and adaptive support for various computer screen resolutions.
    1. Support for iPhone/ iPads
    1. Support for Blackberry handhelds.
    1. Support for most other mobile devices!
1. Invite participants through email.
1. Analyse the captured data 
    1. Build charts for individual questions.
    1. Group questions and build charts for the cumulative view.
    1. Draw insights on grouped questions.
    1. Export the data as Excel.
1. Allows you to define simple jump logic (e.g. go to page 10 if user clicks x ).
1. Download and install on your local box if you don't like the hosted instance!

## Technology Stack

The application code is written in JavaScript

* **APIs**: Node JS and Express JS
* **Frontend**: React JS
* **Database**: MongoDB.

## Installation

1. Git clone this repository
1. You must have the latest Node JS (v14 onwards) installed.
1. Install MongoDB and run mongod
1. To start the API server, run the following:

	```
	cd api
	npm install
	npm start
	```
1. To start the frontend, run the following:

	```
	cd ui
	npm install
	npm start
	```
1. Once the frontend has been started, it will automatically open `http://localhost:3000` in your default browser. Alternatively, you can use the URL to open it yourself
1. For the APIs, you can run tests using `npm test`

## Production set up

1. You can choose for a bare metal or a Docker installation
2. With Docker containers, Kubernetes or AWS Fargate will be natural choices at the time of writing these instructions
3. The UI is hosted on Nginx
4. API is run via PM2
5. Appropriate environment variables need to be set in the target environment for the API to work. Following is the list as of now:

```
NODE_ENV: production
FACTILE_API_BASE_URL
FACTILE_UI_BASE_URL
FACTILE_API_BASE_URL
FACTILE_UI_BASE_URL
FACTILE_COOKIE_SECRET
FACTILE_GOOGLE_CLIENT_ID
FACTILE_GOOGLE_SECRET
FACTILE_FACEBOOK_APP_ID
FACTILE_FACEBOOK_SECRET
FACTILE_JWT_SECRET
FACTILE_MAIL_PASSWORD
```



## Contributing to the source code

1. Fork the project into your github account
2. Make the modifications
3. Submit a pull request
4. Be nice and respectful
5. Please note: pull requests will only be accepted when they contain appropriate unit tests
