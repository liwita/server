import * as _ from 'lodash';

import { Assert } from './assert';

/**
 * TODO(jsh): Add following modules to load .env files...
 * LINK: https://github.com/motdotla/dotenv
 * LINK: https://github.com/rolodato/dotenv-safe
 */
export class Environment {
  public static readonly IS_PRODUCTION_MODE: boolean = Environment.get('NODE_ENV') ===
    'development';

  public static get(_name: string): string {
    Assert.check(_.isString(_name), 'ERROR: Enviroment key not defined.');
    const result: string = process.env[_name];
    Assert.check(_.isString(result), `ERROR: 'process.env.${_name}' not found/set.`);
    return result;
  }
}
