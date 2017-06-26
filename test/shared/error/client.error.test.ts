import { expect } from './../../imports';

import { ClientError } from './../../../src/shared/error';

describe('shared/error/ClientError', () => {
  describe(`throw`, () => {
    it(`should be 'This is very bad!'`, () => {
      expect(() => {
        throw new ClientError(400, 'This is very bad!', new Error('Oh boy!'));
      }).to.throw(ClientError, 'This is very bad!');
    });
  });
});
