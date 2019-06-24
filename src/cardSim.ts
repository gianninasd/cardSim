import express from "express";
import uuidv4 from "uuid/v4";

const app = express();
const port = 3000;

// initializes some fields before we process the request
function initProcessing(req:any, res:any, next:any) {
  let guid = uuidv4(); // generate request GUID
  req.guid = guid;
  next();
}

// validates the incoming request
function validateReq(req:any, res:any, next:any) {
  if( !req.is("application/json") ) {
    throw new Error("Content-Type is not application/json");
  }
  else {
    next();
  }
}

// used to catch and return any errors
function defaultErrorHandler(err:any, req:any, res:any, next:any) {
  console.log("[" + req.guid + "] Error occured: " + err.message)
  res.status(500)
  res.set("Content-Type", "application/json")
  res.send({ error: err.message })
}

// setup parsing and middleware routing
app.use(express.json());
app.use(initProcessing);
app.use(validateReq);
app.use(defaultErrorHandler);

// handle GET requests
app.get("/", (req: any, res: any) => {
  res.send("Card Simulator 0.1");
});

// handle POST requests
app.post("/", (req:any, res:any) => {
  // TODO validate body

  console.log("[" + req.guid + "] Incoming request from " + req.ip);
  console.log("body>> " + req.body);
  let o:any = req.body;
  console.log("merchantRefNum>> " + o.merchantRefNum);

  if( o.merchantRefNum ) {
    console.log("merchantRefNum>> it exists");
  }
  
  console.log("cardNum>> " + o.card.cardNum);

  res.status(200)
  res.set("Content-Type", "application/json")
  res.send({id: req.guid});
});

// start the application listener
app.listen(port, () => {
  console.log(`Card Simulator listening on port ${port}!`)
});
