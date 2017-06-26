import { CustomError } from './custom.error';

/**
 * NOTE: This is a generic Error rised on the Client sides of things,
 * i.e. the Client (Browser/Mobile, etc.) did something the Server could not resolve..
 * @export
 * @class ClientError
 * @extends {CustomError}
 */
export class ClientError extends CustomError {
  public constructor(_status: number, _message: string, _inner: any = null) {
    super(_status, _message, _inner);
  }
}

export class UnauthorizedError extends ClientError {
  public constructor(_message: string, _inner: any = null) {
    super(401, _message, _inner);
  }
}
