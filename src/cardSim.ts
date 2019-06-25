import express from "express";
import uuidv4 from "uuid/v4";

import {CardRequest} from "./CardRequest";
import {CardResponse} from "./CardResponse";
import {AuthProcessor} from "./AuthProcessor";

const app = express();
const port = 3000;

// initializes some fields before we process the request
function initProcessing(req: any, res: any, next: any) {
  const guid = uuidv4(); // generate request GUID
  req.guid = guid;
  next();
}

// validates the incoming request
function validateReq(req: any, res: any, next: any) {
  if ( !req.is("application/json") ) {
    throw new Error("Content-Type is not application/json");
  } else {
    next();
  }
}

// used to catch and return any errors
function defaultErrorHandler(err: any, req: any, res: any, next: any) {
  console.log(`[${req.guid}] Error occured: ${err.message}`);
  res.status(500);
  res.set("Content-Type", "application/json");
  res.send({ id: req.guid, error: err.message });
}

// setup parsing and middleware routing
app.use(express.json());
app.use(initProcessing);
app.use(validateReq);
app.use(defaultErrorHandler);

// GET request handler
app.get("/", (req: any, res: any) => {
  res.status(200);
  res.set("Content-Type", "text/plain");
  res.send("Card Simulator 0.1");
});

// POST request handler
app.post("/", (req: any, res: any) => {
  // TODO validate body

  console.log(`[${req.guid}] Incoming request from ${req.ip}`);

  // get raw json object and parse it
  const rawData: any = req.body;
  let cardRequest:CardRequest = CardRequest.parse(req.guid, rawData);

  // run thru simulator and generate a response
  const processor = new AuthProcessor();
  const response:CardResponse = processor.process( cardRequest );

  console.log(`[${req.guid}] Response was ${response.rawData.decision}`);

  res.status(response.httpStatusCode);
  res.set("Content-Type", "application/json");
  res.send(response.rawData);
});

// start the application listener
app.listen(port, () => {
  console.log(`Card Simulator listening on port ${port}!`);
});
