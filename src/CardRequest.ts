/**
 * Represents an incoming card request
 */
export class CardRequest {
  id:string;
  merchantRefNum:string;
  amount:number;
  settleWithAuth:boolean;
  zip:string;

  cardBrand:string;
  cardNum:string;
  cardExpiryMonth:string;
  cardExpiryYear:string;

  // converts raw json object into this instance
  static parse( id:string, obj:any ):CardRequest {
    let req:CardRequest = new CardRequest();
    req.id = id;
    req.merchantRefNum = obj.merchantRefNum;
    req.amount = obj.amount;
    req.settleWithAuth = obj.settleWithAuth;
    req.zip = obj.billingDetails.zip;

    req.cardBrand = this.parseBrand(obj.card.cardNum);
    req.cardNum = obj.card.cardNum;
    req.cardExpiryMonth = obj.card.cardExpiry.month;
    req.cardExpiryYear = obj.card.cardExpiry.year;

    return req;
  }

  // determines the card brand from the number
  static parseBrand( cardNum:any ):string {
    let firstDigit = cardNum.substring(0, 1);
    let brand:string = "";

    switch( firstDigit ) {
      case "3": brand = "AM"; break;
      case "4": brand = "VI"; break;
      case "5": brand = "MC"; break;
    }

    return brand;
  }
}