About this Project
__________________________

An online Euchre (Michigan style!) game using Ruby on Rails. 

Built with:
1. Rails
2. Bootstrap
3. javascript SocketIO
4. PostgreSQL
5. jquery

Getting Started
__________________________

Prerequisites:
You must have a hosting acount such as Heroku or Azure to host this software.

Steps for Heroku:
0. clone this repository locally
1. Login or register
2. From dashboard navigate to create new application
3. Enter app name and other config
4. install Heroku CLI (https://devcenter.heroku.com/articles/heroku-command-line)
5. login to heroku from prompt
  $ heroku login
6. add heroku SQL with commands below
    $ heroku addons:create heroku-postgresql:<hobby-dev>
7. get the database address with the following command
    $ heroku config
8. add the adjusted database url to database config in config\database.yml
    production:
      encoding: utf8
      url: <Your DB URI Here >
9. cd to the location of local repository in prompt
10. input following command
  $ git init
  $ heroku git:remote -a YOUR_APP_NAME_HERE
  $ git add .
  $ git commit -am "YOUR NOTE HERE"
  $ git push heroku master
11. Then you should have this app running!



Usage
__________________________

This project acts as an example of how you can use SocketIO to have users directly interact with a server and implement interactive usage of Python with user interface. Feel free to adapt it or improve it as you see fit.

Playing:
1. create account
2. Create room
3. Click start game


Contributing
__________________________

You are more than welcome to build upon the code I have here! Please create a new branch before doing so.


License
__________________________

Distributed under the MIT license.


Acknowledgements
__________________________
 
Card Illustration Source: https://chicodeza.com/freeitems/torannpu-illust.html
