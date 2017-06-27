import * as _ from 'lodash';

export abstract class Service {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor() {
    this._name = _.snakeCase(this.constructor.name);
  }
}
