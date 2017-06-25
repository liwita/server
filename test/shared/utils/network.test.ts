import { expect } from './../../imports';

import { Network } from './../../../src/shared/utils';

describe('shared/utils/Network', () => {
  const rawProtocol = 'https';
  const rawAddress = '127.0.0.1';
  const rawPort = 3000;
  const rawFullAddress = `${rawProtocol}://${rawAddress}:${rawPort}`;
  const rawPath1 = 'api';
  const rawPath2 = 'auth';

  describe(`buildFullAddress`, () => {
    const expected = rawFullAddress;

    it(`should be ${expected}`, () => {
      const result = Network.buildFullAddress(rawProtocol, rawAddress, rawPort);
      expect(result).to.equal(expected);
    });
  });

  describe(`clearPath`, () => {
    const expected = 'api/auth';

    it(`should be ${expected}`, () => {
      const result = Network.clearPath(`/${rawPath1}/${rawPath2}/`);
      expect(result).to.equal(expected);
    });
  });

  describe(`concatPaths`, () => {
    const expected = rawFullAddress;

    it(`should be ${expected}`, () => {
      const result = Network.concatPaths([`${rawFullAddress}/`]);
      expect(result).to.equal(expected);
    });
  });

  describe(`concatPaths`, () => {
    const expected = `${rawFullAddress}/${rawPath1}/${rawPath2}`;
    it(`should be ${expected}`, () => {
      const result = Network.concatPaths([`${rawFullAddress}/`, `/${rawPath1}/`, `/${rawPath2}/`]);
      expect(result).to.equal(expected);
    });
  });

  describe(`prefixPath`, () => {
    const expected = `/${rawPath1}`;
    it(`should be ${expected}`, () => {
      const result = Network.prefixPath(`/${rawPath1}`);
      expect(result).to.equal(expected);
    });
  });

  describe(`postfixPath`, () => {
    const expected = `${rawPath2}/`;
    it(`should be ${expected}`, () => {
      const result = Network.postfixPath(`${rawPath2}/`);
      expect(result).to.equal(expected);
    });
  });
});
