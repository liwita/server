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
    this._name = _.snakeCase(this.constructor.name);
  }

  public toJSON(_withInner: boolean = false): object {
    if (_withInner && this.inner) {
      return { status: 'error', code: this.name, message: this.message, inner: this.inner };
    } else {
      return { status: 'error', code: this.name, message: this.message };
    }
  }

  public toString(): string {
    return `${this.constructor.name}: ${this.message}`;
  }
}
