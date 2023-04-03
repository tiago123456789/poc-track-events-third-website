The project:
=============

The ideia here one solution allow track event the third website.

Technologies:
================
- backend
    Node.js(version 16.8.0)
    Javascript
    Mongodb
    Redis(Cache and Rate limit)
    Bull + Redis(Queue)
    Docker 
    Docker compose
- frontend-react
    React.js
- frontend-next
    Next.js
- frontend-vue
    Vue.js
- frontend-html
    - PHP(To create server to test solution html page)
- sdk-js
    - Javascript
    - Gulp(To build the sdk)

Instructions to running project:
==================================

- Clone project
- Backend
    - Access directory **backend**
    - Execute command **npm i**
    - Create **.env** file based **.env.example**
    - Execute command **docker-compose up -d**
    - Execute command **npm run start:dev** to run api
    - Execute command **npm run job:dev** to run background task to save event tracked in database.
- frontend-react
    - Access directory **frontend-react**
    - Execute command **npm i**
    - Execute command **npm run start**
- frontend-next
    - Access directory **frontend-next**
    - Execute command **npm i**
    - Execute command **npm run dev**
- frontend-vue
    - Access directory **frontend-vue**
    - Execute command **npm i**
    - Execute command **npm run dev**
- frontend-html
    - Access directory **frontend-html**
    - Execute command **php -S localhost:5000 -t ./** to run php server and php start server html pages. OBS: you need php version 5.6 or more than it.
