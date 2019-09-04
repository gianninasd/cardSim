# Card Simulator Service
Card Processing simulator service written in Typescript, running on NodeJS. Makes use of Express and Jest open source libraries. In addition there are instructions below on how to run it from within a Docker container.

## Pre-requisites
- Install Git 2.x
- Install Node.JS 10.x

Now to get the code and install the dependencies perform the following commands:
- `git clone https://github.com/gianninasd/cardSim.git`
- `cd cardSim`
- Open a console and run `npm install`

## Running application
 Open a console and run `npm run start` and you will see processing output on your console and once you see:
 
 `Card Simulator 1.0.0 running on win32 (10.0.17134), listening on port 3000!`
 
 Now use your favorite REST client (either Postman or Insomnia) to send a request with the following JSON payload:
 
 ```
 {
  "merchantRefNum": "invoice-1",
  "amount": 1800,
  "settleWithAuth": "true",
  "card": {
    "cardNum": "5500000000000004",
    "cardExpiry": {
      "month": "09",
      "year": "2021"
    }
  },
  "billingDetails": {
    "zip": "H8P3S2"
  }
}
 ```
 
 If you wish to simulate a failed response, use one of the amounts mentioned below.
 
Amount | Decision | HTTP Response Code | Error Code | Description
------------ | ------------- | ------------- | ------------- | -------------
5 | FAILED | 400 | 1005 | Transaction declined by the bank
7 | FAILED | 400 | 1007 | Insufficient funds
*Anything else* | COMPLETED | 200 | *n/a* | *n/a*

To run only the unit tests, from the console window run `npm run test`

## Running within a Docker container
In order to run the Card Processing simulator service within a Docker container, follow the steps below from a console:
1. `docker build -t <your docker username>/cardsim .` to build your image file
2. `docker images` to confirm your image file was created successfully
3. `docker run -p 49160:3000 -d <your docker username>/cardsim` to start the application
4. `docker ps` to confirm it is up-and-running; you should see the container id, port mapping information and the up time
5. `docker logs <container id>` every once in a while to see the most recent output

*Note: You might encounter error messages the first times you run steps 1 or 3, this is due to issues with Docker, to resolve them just restart Docker at those steps and execute them again*

## References
Below are some reference web sites
- https://nodejs.org/en/
  - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
  - https://buddy.works/guides/how-dockerize-node-application
- https://docs.npmjs.com/files/package.json
- https://www.typescriptlang.org/
- https://expressjs.com/
- https://jestjs.io/en/
