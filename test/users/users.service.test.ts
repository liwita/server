import { expect } from './../imports';

import { UsersService } from './../../src/users';

describe('users/UsersService', () => {
  const service = new UsersService();

  describe(`findById: 3`, () => {
    it(`should be '3'`, async () => {
      const user = await service.getById(3);
      console.log(user);
      expect(user.id).to.equal(3);
    });
  });
});
