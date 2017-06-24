import * as _ from 'lodash';

export abstract class Service {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor() {
    /**
     * TODO: Remove the 'Error' part..
     */
    this._name = _.snakeCase(this.constructor.name);
  }
}
