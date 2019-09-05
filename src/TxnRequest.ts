import {CardRequest} from "./CardRequest";

/**
 * Represents the transaction request document to be saved in a flat DB.
 */
export class TxnRequest {
  public id:string;
  public clientIp:string;
  public txnDate:Date;
  public status:string;
  public merchantRefNum:string;
  public amount:number;
  public authCode:string;

  /**
   * Generates a TxnRequest object based on the CardRequest.
   */
  public static fromRequest( ip:string, req:CardRequest ):TxnRequest {
    const txnReq:TxnRequest = new TxnRequest();
    txnReq.id = req.id;
    txnReq.clientIp = ip;
    txnReq.txnDate = new Date();
    txnReq.status = "RECEIVED";
    txnReq.merchantRefNum = req.merchantRefNum;
    txnReq.amount = req.amount;
    return txnReq;
  }
}
