export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNPROCESSABLE_ENTITY = 422, 
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum HttpErrorMessage {
  OK = "The request has succeeded",
  CREATED = "The request has been fulfilled and a new resource has been created",
  NO_CONTENT = "The request has been successfully processed but has no response body",
  MOVED_PERMANENTLY = "The requested resource has been permanently moved to a new URL",
  FOUND = "The requested resource has been temporarily moved to a new URL",
  NOT_MODIFIED = "The requested resource has not been modified since the last time it was requested",
  BAD_REQUEST = "The server cannot or will not process the request due to an apparent client error",
  UNAUTHORIZED = "The request requires authentication",
  FORBIDDEN = "The server understands the request, but refuses to authorize it",
  NOT_FOUND = "The requested resource could not be found on the server",
  METHOD_NOT_ALLOWED = "The method specified in the request is not allowed",
  NOT_ACCEPTABLE = "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request",
  REQUEST_TIMEOUT = "The server timed out waiting for the request",
  PAYLOAD_TOO_LARGE = "The request is larger than the server is willing or able to process",
  UNSUPPORTED_MEDIA_TYPE = "The request entity has a media type which the server or resource does not support",
  UNPROCESSABLE_ENTITY = "The request was well-formed but was unable to be followed due to semantic errors",
  INTERNAL_SERVER_ERROR = "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable",
  BAD_GATEWAY = "The server was acting as a gateway or proxy and received an invalid response from the upstream server",
  SERVICE_UNAVAILABLE = "The server is currently unable to handle the request due to a temporary overload or maintenance of the server",
  GATEWAY_TIMEOUT = "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server",
}



export interface HttpErrorArgs {
  message: HttpErrorMessage;
  httpCode: HttpStatusCode;
  isOperational?: boolean;
}
