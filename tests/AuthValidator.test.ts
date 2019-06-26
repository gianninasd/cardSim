import {AuthValidator} from "../src/AuthValidator";
import {ValidationError} from "../src/ValidationError";

let val:AuthValidator = new AuthValidator();

test("validation all good", () => {
  let rawData:object = {
    id: "some-id",
    merchantRefNum: "ref-1",
    amount: 1500,
    settleWithAuth: true,
    card: {
      cardNum: "5500000000000004",
      cardExpiry: {
        month: "09",
        year: "2021"
      }
    },
    billingDetails: {
      zip: "H8P3S2"
    }
  };
  let result:Array<ValidationError> = val.validate(rawData);
  expect(result.length).toBe(0);
});

test("missing amount", () => {
  let rawData:object = {
    id: "some-id",
    merchantRefNum: "ref-1",
    settleWithAuth: true,
    card: {
      cardNum: "5500000000000004",
      cardExpiry: {
        month: "09",
        year: "2021"
      }
    },
    billingDetails: {
      zip: "H8P3S2"
    }
  };
  let result:Array<ValidationError> = val.validate(rawData);
  expect(result.length).not.toBe(0);
});

test("amount must be numeric", () => {
  let rawData:object = {
    id: "some-id",
    merchantRefNum: "ref-1",
    amount: "bad!",
    settleWithAuth: true,
    card: {
      cardNum: "5500000000000004",
      cardExpiry: {
        month: "09",
        year: "2021"
      }
    },
    billingDetails: {
      zip: "H8P3S2"
    }
  };
  let result:Array<ValidationError> = val.validate(rawData);
  expect(result.length).not.toBe(0);
  expect(result[0].message).toBe("field 'amount' must be numeric");
});

test("missing merchantRefNum", () => {
  let rawData:object = {
    id: "some-id",
    amount: 1500,
    settleWithAuth: true,
    card: {
      cardNum: "5500000000000004",
      cardExpiry: {
        month: "09",
        year: "2021"
      }
    },
    billingDetails: {
      zip: "H8P3S2"
    }
  };
  let result:Array<ValidationError> = val.validate(rawData);
  expect(result.length).not.toBe(0);
});