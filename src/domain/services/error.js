export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    // noinspection JSUnusedGlobalSymbols
    this.code = statusCode;
    this.name = this.constructor.name;
  }
}
