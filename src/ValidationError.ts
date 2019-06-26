/**
 * Represents a validation error message
 */
export class ValidationError {
  public field: string;
  public message: string;

  constructor( message: string ) {
    this.message = message;
  }
}
