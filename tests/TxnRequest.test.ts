import {CardRequest} from "../src/CardRequest";
import {CardResponse} from "../src/CardResponse";
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

test("TxnRequest update from CardResponse", () => {
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

  const resp: object = {
    id: cardReq.id,
    status: "COMPLETED",
    merchantRefNum: cardReq.merchantRefNum,
    txnTime: txnReq.txnDate,
    settleWithAuth: cardReq.settleWithAuth,
    amount: cardReq.amount,
    authCode: "A1608Z"
  };

  let res:CardResponse = new CardResponse(200, resp);

  txnReq.update(res);
  expect(txnReq.status).toBe(res.rawData.status);
  expect(txnReq.authCode).toBe(res.rawData.authCode);
  expect(txnReq.httpStatusCode).toBe(res.httpStatusCode);
});