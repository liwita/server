import * as _ from 'lodash';

import { Assert } from './assert';

export class Network {
  public static buildFullAddress(_protocol: string, _address: string, _port: number): string {
    const protocol = _protocol || Assert.fail('Protocol is missing');
    const address = _address || Assert.fail('Address is missing');
    const port = _port || Assert.fail('Port is missing');
    return `${protocol}://${Network.clearPath(address)}:${port}`;
  }

  public static concatPaths(_paths: string[]): string {
    Assert.check(_.isArray(_paths) && _paths.length > 0, 'Paths is missing');
    return _paths.map((_path: string) => _.trim(_path, '/')).join('/');
  }

  public static clearPath(_path: string): string {
    Assert.check(_.isString(_path), 'Path is missing');
    return _.trim(_path, '/');
  }

  public static prefixPath(_path: string): string {
    Assert.check(_.isString(_path), 'Path is missing');
    return `/${_.trimStart(_path, '/')}`;
  }

  public static postfixPath(_path: string): string {
    Assert.check(_.isString(_path), 'Path is missing');
    return `${_.trimEnd(_path, '/')}/`;
  }
}
