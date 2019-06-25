import {CardRequest} from "./CardRequest";
import {CardResponse} from "./CardResponse";

/**
 * Simulates the processing of a credit card auth request
 */
export class AuthProcessor {

  // generate either a successful or error response based on the amount
  public process( req: CardRequest ):CardResponse {
    let response:CardResponse;
    let rawResponse:any;

    switch( req.amount ) {
      case 5:
        rawResponse = this.generateError(req, 1005, "Transaction declined by the bank");
        response = new CardResponse(400, rawResponse);
        break;
      case 7:
        rawResponse = this.generateError(req, 1007, "Insufficient funds");
        response = new CardResponse(400, rawResponse);
        break;
      default:
        rawResponse = this.generateSuccess(req);
        response = new CardResponse(200, rawResponse);
    }

    return response;
  }

  // generates an error response object
  private generateError(req: CardRequest, code:number, message:string):object {
    let resp: object = {
      id: req.id,
      decision: "FAILED",
      txnTime: new Date(),
      settleWithAuth: req.settleWithAuth,
      amount: req.amount,
      error: {
        code: code,
        message: message
      }
    };

    return resp;
  }

  // generates a successful response object
  private generateSuccess(req: CardRequest):object {
    let resp: object = {
      id: req.id,
      decision: "COMPLETED",
      txnTime: new Date(),
      settleWithAuth: req.settleWithAuth,
      amount: req.amount,
      card: {
        brand: "VI",
        cardEnding: req.cardNum.substr(12)
      },
      authCode: "A1608Z"
    };

    return resp;
  }
}
