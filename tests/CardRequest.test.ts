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

test("return default data when paymentToken", () => {
  let rawData:object = {
    merchantRefNum: "ref-1",
    amount: 1500,
    settleWithAuth: true,
    card: {
      paymentToken: "5d6efecd9f4343"
    },
    billingDetails: {
      zip: "H8P3S2"
    }
  };
  
  let cardReq:CardRequest = CardRequest.parse("some-id", rawData);
  expect(cardReq.id).toBe("some-id");
  expect(cardReq.merchantRefNum).toBe("ref-1");
  expect(cardReq.amount).toBe(1500);
  expect(cardReq.cardBrand).toBe("MC");
  expect(cardReq.cardNum).toBe("5500000000000004");
});