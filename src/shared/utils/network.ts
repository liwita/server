import * as _ from 'lodash';

import { Assert } from './assert';

export class Network {
  public static normalizeAddress(_address: string): string {
    if (_.isString(_address) && _address.length) {
      return _address;
    }
    return Assert.fail(`Failed to normalize address '${_address}'`);
  }
  public static normalizePort(_value: (number | string)): number {
    const port: number = _.isString(_value) ? parseInt(_value, 10) : _value;
    if (_.isNumber(port) && port > 0) {
      return port;
    }
    return Assert.fail(`Failed to normalize port '${_value}'`);
  }

  public static generateFullAddress(_protocol: string, _address: string, _port: number): string {
    const protocol = _protocol || Assert.fail('Protocol is missing');
    const address = _address || Assert.fail('Address is missing');
    const port = _port || Assert.fail('Port is missing');
    return `${protocol}://${Network.clearPath(address)}:${port}`;
  }

  public static concatPath(_pathA: string, _pathB: string): string {
    Assert.check(_.isString(_pathA), 'Path a is missing');
    Assert.check(_.isString(_pathB), 'Path b is missing');
    return `${Network.postfixPath(_pathA)}/${Network.prefixPath(_pathB)}`;
  }

  public static clearPath(_path: string): string {
    Assert.check(_.isString(_path), 'Path is missing');
    return _.trimStart(_.trimEnd(_path, '/'), '/');
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
