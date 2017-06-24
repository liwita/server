import * as assert from 'assert';

export class Assert {
  public static check(_value: any, _message: string): any {
    return assert.ok(_value, _message);
  }
  public static fail(_message: string): any {
    return assert.ok(false, _message);
  }
}
