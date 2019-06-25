import {CardRequest} from "../src/CardRequest";

let req:CardRequest = new CardRequest();

// setup sample data before any of the tests are executed
beforeAll(() => {
  req.id = "some-id";
  req.cardNum = "4111222233334444";
  req.amount = 1500;
});

test("determine VI brand", () => {
  req.cardNum = "4111222233334444";
  let brand = CardRequest.parseBrand(req.cardNum);
  expect(brand).toBe("VI");
});

test("determine MC brand", () => {
  req.cardNum = "5500000000000004";
  let brand = CardRequest.parseBrand(req.cardNum);
  expect(brand).toBe("MC");
});

test("determine AM brand", () => {
  req.cardNum = "340000000000009";
  let brand = CardRequest.parseBrand(req.cardNum);
  expect(brand).toBe("AM");
});