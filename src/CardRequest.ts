/**
 * Represents an incoming card request
 */
export class CardRequest {
  public id:string;
  public merchantRefNum:string;
  public amount:number;
  public settleWithAuth:boolean;
  public zip:string;

  public cardBrand:string;
  public cardNum:string;
  public cardExpiryMonth:string;
  public cardExpiryYear:string;

  // converts raw json object into this instance
  public static parse( id:string, obj:any ):CardRequest {
    const req:CardRequest = new CardRequest();
    req.id = id;
    req.merchantRefNum = obj.merchantRefNum;
    req.amount = obj.amount;
    req.settleWithAuth = obj.settleWithAuth;
    req.zip = obj.billingDetails.zip;

    // if card element has a paymentToken provided, then simulate data, else extract them
    if( obj.card.paymentToken ) {
      req.cardBrand = "MC";
      req.cardNum = "5500000000000004";
    } else {
      req.cardBrand = this.parseBrand(obj.card.cardNum);
      req.cardNum = obj.card.cardNum;
      req.cardExpiryMonth = obj.card.cardExpiry.month;
      req.cardExpiryYear = obj.card.cardExpiry.year;
    }

    return req;
  }

  // determines the card brand from the number
  public static parseBrand( cardNum:any ):string {
    const firstDigit = cardNum.substring(0, 1);
    let brand:string = "";

    switch( firstDigit ) {
      case "3": brand = "AM"; break;
      case "4": brand = "VI"; break;
      case "5": brand = "MC"; break;
    }

    return brand;
  }
}
