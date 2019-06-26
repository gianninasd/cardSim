# Card Simulator Service
Card Processing simulator service written in Typescript, running on NodeJS. Makes use of Express and Jest open source libraries.

## Pre-requisites
- Install Git
- Install Node.JS 10.x

Now to get the code and install the dependencies perform the following commands:
- `git clone https://github.com/gianninasd/cardSim.git`
- `cd cardSim`
- Open a console and run `npm install`

## Running application
 Open a console and run `npm run start` and you will see processing output on your console and once you see `Card Simulator listening on port 3000!`, open a browser window and navigate to http://localhost:3000
 
Amount | HTTP Response Code | Decision | Description
------------ | ------------- | ------------- | -------------
5 | 400 | FAILED | Declined by the bank
7 | 400 | FAILED | Insufficient funds
Anything else | 200 | COMPLETED | -

In order to simulate an error response, set the amount to a value of either `5` or `7`

To run only the unit tests, from the console window run `npm run test`

## References
Below are some reference web sites
- https://nodejs.org/en/
- https://docs.npmjs.com/files/package.json
- https://www.typescriptlang.org/
- https://expressjs.com/
- https://jestjs.io/en/
