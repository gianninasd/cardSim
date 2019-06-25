/**
 * Represents a card response that will be returned to the calling client
 */
export class CardResponse {
  httpStatusCode:number;
  rawData:any;

  constructor ( httpStatusCode:number, rawData:object ) {
    this.httpStatusCode = httpStatusCode;
    this.rawData = rawData;
  }
}