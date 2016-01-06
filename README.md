### Welcome to Factile!

[![Join the chat at https://gitter.im/asinghal/factile](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/asinghal/factile?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Factile is an online survey platform that enables market research and insights into data. This is an open source tool and available for free for all purposes. 

The only thing I must ask for is that you give the due credits to Factile when using it. And please feel free to Tweet about it, share it with your friends and colleagues or write blogs about it! Publicity is more than welcome, ofcourse!

## License

The tool and its source code are available under the LGPL license (http://www.gnu.org/copyleft/lesser.html). However, your contributions are welcome and I'll be happy to discuss if you have a need to use the code/ application outside of the LGPL license. You can reach me at asinghal79 at gmail dot com.

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

The application code is written in Scala and uses the Play framework. The database used is MongoDB.

## Installation

1. Git clone this repository
1. You must have play, scala 2.9 and sbt installed.
1. Install MongoDB and run mongod
1. Install RabbitMQ
1. Start this application by going into the directory and running "play". On the console that opens, type "run".
1. Open http://localhost:9000 !

*PS:* If you get an error 'Mongo db "can't call something"', check https://github.com/asinghal/factile/issues/2

