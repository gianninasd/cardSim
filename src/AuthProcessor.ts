import {CardRequest} from "./CardRequest";

/**
 * Simulates the processing of a credit card auth request
 */
export class AuthProcessor {

  // generate either a successful or error response based on the amount
  public process( req: CardRequest ): any {

    const resp: object = {
      id: req.id,
      status: "COMPLETE",
      txnTime: new Date(),
      settleWithAuth: req.settleWithAuth,
      card: {
        brand: "VI",
        cardEnding: req.cardNum.substr(12)
      }
    };

    return resp;
  }
}
