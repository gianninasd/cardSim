import {ValidationError} from "./ValidationError";

/**
 * Validates the authorization requests for the minimum fields
 */
export class AuthValidator {

  public validate( obj: any ): ValidationError[] {
    const result: ValidationError[] = [];

    if ( obj.amount ) {
      if ( typeof obj.amount !== "number" ) {
        const err: ValidationError = new ValidationError("field 'amount' must be numeric");
        result.push(err);
      }
    } else {
      const err: ValidationError = new ValidationError("missing field 'amount'");
      result.push(err);
    }

    if ( !obj.merchantRefNum ) {
      const err: ValidationError = new ValidationError("missing field 'merchantRefNum'");
      result.push(err);
    }

    return result;
  }
}
