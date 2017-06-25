import * as _ from 'lodash';
import * as config from 'config';

import { Assert } from './assert';

export class Configuration {
  public static get<T>(_name: string): T {
    Assert.check(_.isString(_name), 'ERROR: Configuration key not defined.');
    return config.get<T>(_name);
  }
}
