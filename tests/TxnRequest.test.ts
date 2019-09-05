import {CardRequest} from "../src/CardRequest";
import {TxnRequest} from "../src/TxnRequest";

test("TxnRequest from CardRequest", () => {
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
  let txnReq:TxnRequest = TxnRequest.fromRequest("127.0.0.1", cardReq);
  expect(txnReq.id).toBe(cardReq.id);
  expect(txnReq.merchantRefNum).toBe(cardReq.merchantRefNum);
  expect(txnReq.status).toBe("RECEIVED");
  expect(txnReq.amount).toBe(cardReq.amount);
  expect(txnReq.txnDate).not.toBeNull();
  expect(txnReq.clientIp).toBe("127.0.0.1");
});