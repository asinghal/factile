### Welcome to Factile!

[![Join the chat at https://gitter.im/asinghal/factile](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/asinghal/factile?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

## Contributing to the source code

1. Fork the project into your github account
2. Make the modifications
3. Submit a pull request
4. Please note: pull requests will only be accepted when they contain appropriate unit tests
