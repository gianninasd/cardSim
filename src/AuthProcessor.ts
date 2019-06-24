/**
 * Simulates the processing of a credit card auth request
 */
export class AuthProcessor {

  // generate either a successful or error response based on the amount
  public process( id: string ): any {

    const resp: object = {
      id,
      status: "COMPLETE"
    };

    return resp;
  }
}
