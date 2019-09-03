import {CardRequest} from "../src/CardRequest";
import {CardResponse} from "../src/CardResponse";
import {AuthProcessor} from "../src/AuthProcessor";

test("process to return a success", () => {
  let req:CardRequest = new CardRequest();
  req.id = "some-id";
  req.cardNum = "4111222233334444";
  req.amount = 1500;

  const processor = new AuthProcessor();
  const response:CardResponse = processor.process( req );
  
  expect(response.rawData.id).toBe("some-id");
  expect(response.rawData.txnTime).not.toBeNull();
  expect(response.rawData.status).toBe("COMPLETED");
  expect(response.rawData.authCode).not.toBeNull();
});

test("process to return an error", () => {
  let req:CardRequest = new CardRequest();
  req.id = "some-id";
  req.cardNum = "4111222233334444";
  req.amount = 5;

  const processor = new AuthProcessor();
  const response:CardResponse = processor.process( req );
  
  expect(response.rawData.id).toBe("some-id");
  expect(response.rawData.txnTime).not.toBeNull();
  expect(response.rawData.status).toBe("FAILED");
  expect(response.rawData.error.code).toBe(1005);
});
