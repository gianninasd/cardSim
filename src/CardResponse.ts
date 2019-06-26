/**
 * Represents a card response that will be returned to the calling client
 */
export class CardResponse {
  public httpStatusCode:number;
  public rawData:any;

  constructor( httpStatusCode:number, rawData:object ) {
    this.httpStatusCode = httpStatusCode;
    this.rawData = rawData;
  }
}
