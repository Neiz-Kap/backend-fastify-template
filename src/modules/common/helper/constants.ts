export const RESPONSE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  PARTIAL_SUCCESS: 206,
  DUPLICATE: 208,
  BAD_REQUEST: {
    CODE: 400,
    MESSAGE: 'BAD_REQUEST',
  },
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  REQUEST_CONFICT: 409,
  TO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NETWORK_ERROR: 599,
}

export const ERROR404 = {
  statusCode: 404,
  message: 'NOT_FOUND',
}

export const ERROR403 = {
  statusCode: 403,
  message: 'FORBIDDEN_ACCESS',
}

export const ERROR401 = {
  statusCode: 401,
  message: 'UNAUTHORIZED',
}

export const ERROR500 = {
  statusCode: 500,
  message: 'TRY_AGAIN',
}

export const ERROR409 = {
  statusCode: 409,
  message: 'DUPLICATE_FOUND',
}

export const ERROR400 = {
  statusCode: 400,
  message: 'BAD_REQUEST',
}
