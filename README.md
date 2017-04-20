# Peeps and Pets

Using generator from https://github.com/AngularClass/NG6-starter which has 1,724 stars, last commit Nov 26, 2016

## Business Requirements
Followed directions for implementation: http://agl-developer-test.azurewebsites.net/

List all the cats in alphabetical order under a heading of the gender of their owner.
   
## Technical Solution
Written in Angular.js 1.5 using ES6, uses lodash for data transformations, requires Node.js 6.3.0 (NVM).
Test framework is Karma, using Protractor for e2e tests and mocha and chai for unit tests.
   
## Instructions
1. Check out repository locally
   `git clone git://github.com/rpocklin/peeps-and-pets.git`
1. Change directory
   `cd peeps-and-pets`
1. NPM Install
   `npm i`
1. To run all tests
   `npm test`
1. To run server in development mode (hot-reloadable)
   `npm start`
1. Navigate to `http://localhost:3000` in your preferred browser.
1. Have fun with the peeps and their pets!   
   
## Creating a new component
You may, of course, create these files manually, every time a new module is needed, but that gets quickly tedious.
To generate a component, run `npm run component -- --name componentName`.

## TODO
1.  Fix CORS issue for specified API endpoint `http://agl-developer-test.azurewebsites.net/people.json`
1.  Add E2E tests
1.  Add code coverage report
1.  Add eslint checking
1.  Add semantic release / changelog toolset

