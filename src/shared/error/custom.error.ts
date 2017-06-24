import * as _ from 'lodash';

export class CustomError extends Error {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  public get status(): number {
    return this._status;
  }
  public get inner(): any {
    return this._inner;
  }

  public constructor(private _status: number, _message: string, private _inner: any = null) {
    super(_message);
    /**
     * TODO: Remove the 'Error' part..
     */
    this._name = _.snakeCase(this.constructor.name);
  }
}
