/**
 * Represents an incoming card request
 */
export class CardRequest {
  id:string;
  merchantRefNum:String;
  amount:number;
  settleWithAuth:boolean;
  zip:String;

  cardNum:String;
  cardExpiryMonth:String;
  cardExpiryYear:String;

  // converts raw json object into this instance
  static parse( id:string, obj:any ):CardRequest {
    let req:CardRequest = new CardRequest();
    req.id = id;
    req.merchantRefNum = obj.merchantRefNum;
    req.amount = obj.amount;
    req.settleWithAuth = obj.settleWithAuth;
    req.zip = obj.billingDetails.zip;

    req.cardNum = obj.card.cardNum;
    req.cardExpiryMonth = obj.card.cardExpiry.month;
    req.cardExpiryYear = obj.card.cardExpiry.year;

    return req;
  }
}