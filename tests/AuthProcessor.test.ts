import {CardRequest} from "../src/CardRequest";
import {AuthProcessor} from "../src/AuthProcessor";

test("process to return an id", () => {
  let req:CardRequest = new CardRequest();
  req.id = "some-id";
  req.cardNum = "4111222233334444";

  const processor = new AuthProcessor();
  const response = processor.process( req );
  
  expect(response.id).toBe("some-id");
  expect(response.txnTime).not.toBeNull();
});
