Instructions
============

Important content of structure:

- app/  : Contains the main source code of application (controller, filter, service, images, ...)
  - images/
  - scripts/ 
    - controllers
    - services
    - filters
    - app.js : the main file to control the application
  - styles  : css stylesheets
  - views   : template of application
  - index.html : main file to connect all components
- dist/ : The compiled source code



This application was made using Yeoman in order to create the scaffolding of structure and the compilation was made with Grunt.

How to execute the application?
===============================
Install prerequisites:

- Before installing Yeoman, you will need the following:

    * Node.js v0.10.x+
    * npm (which comes bundled with Node) v2.1.0+

    You can check if you have Node and npm installed by typing:

    '''
    node --version && npm --version
    '''

- You will have to install all dependencies by typing:

  '''
  npm install
  '''

Start the server:

  Run a Grunt task to create a local, Node-based http server on localhost:9000 (or 127.0.0.1:9000 for some configurations) by typing:

  '''
  grunt --force serve
  '''

  Your web browser will launch your newly scaffolded application in a new tab:

How to works the application?
=============================


The application requires to enter a URL with a valid content of RSS, like for example:

http://rss.cnn.com/services/podcasting/studentnews/rss.xml
or
http://rss.cnn.com/services/podcasting/ac360/rss.xml

When we type a URL immediately at the left side will be loaded the chapters and using the keys can move through from them.

If press key DOWN, it will go forward of chapters, if we want to play some of them, press ENTER

If we want to watch more videos, we will have to go forward until the 'Down Arrow' is active, when press ENTER on it, it will be loaded the next range of chapters

Execute the application from a Server?
======================================

Very easy!! You only have to upload the content of 'dist' folder to any Apache Server, and you will see the result immediately