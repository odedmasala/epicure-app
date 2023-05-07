import { NextFunction, Request, Response } from 'express';
import { HttpErrorArgs, HttpErrorMessage, HttpStatusCode } from '../exceptions';
export class HttpError extends Error {
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;
  
  constructor(args: HttpErrorArgs) {
    super(args.message);
    Object.setPrototypeOf(this, new.target.prototype);
  
    this.httpCode = args.httpCode;
    this.isOperational = args.isOperational || false;
  }
}
export class ErrorHandler {
  public static handleError(error: Error, request: Request, response: Response, next: NextFunction): void {
    const statusCode = error instanceof HttpError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const errorMessage = error instanceof HttpError ? error.message : HttpErrorMessage.INTERNAL_SERVER_ERROR;
    response.status(statusCode).json({ error: errorMessage });
  }

  public static createHttpError(statusCode: HttpStatusCode, message: HttpErrorMessage, isOperational?: boolean): HttpError {
    return new HttpError({ httpCode: statusCode, message, isOperational });
  }
}
