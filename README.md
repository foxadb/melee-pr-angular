# melee-pr-angular

## Description

Super Smash Bros. Melee Power Ranking front-end webapp designed with [Angular 5](https://angular.io) framework.

## Features

#### For Guest

- Look the power ranking
- Search for specific player details (complete stats, matches results)
- Search for specific tournament details

#### For Manager

- Add new player
- Add new tournament
- Edit player details
- Edit match details
- Edit tournament details
- Delete a player
- Delete a match
- Delete a tournament

#### For Admin

- Add new user (manager/admin)
- Delete an existing user

## Instructions

### Get the Node.js API

Clone the back-end and run it

```
git clone git@github.com:foxadb/melee-pr-express.git
cd melee-pr-express
npm install
```

Run a production API server: `npm start`
Run a test API server: `npm run test-server`

### Install dependencies

```
cd melee-pr-angular
npm install
```

### Development server

Run `npm start` to launch a developpment server for the client part.

Navigate to http://localhost:4200 to access the client.

The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project.

The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org).
Selenium tests in direct connect mode require **Chrome** web browser.
It is recommanded to run selenium tests on a test API server instance with an empty database: use `npm run test-server` on the Express API.
