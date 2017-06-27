import * as _ from 'lodash';

import { Knex } from './../../config/db/knex';

import { Assert } from './../shared/utils';
import { ClientError } from './../shared/error';
import { Service } from './../shared/service';
import { UserModel } from './user.model';

export class UsersService extends Service {
  public constructor() {
    super();
  }

  public async add(_user: UserModel): Promise<UserModel> {
    Assert.check(_.isObject(_user), 'User is not assigned');
    Assert.check(_.isNumber(_user.id), 'User id is already assigned');
    try {
      /**
       * TODO: Validate?
       */
      const columns = _.keys(_user);
      const result = await Knex('users').insert(_user).returning(columns);
      return new UserModel(result);
    } catch (_error) {
      throw new ClientError(500, `Failed to add user: ${_user}`, _error);
    }
  }

  public async getById(_userId: number): Promise<UserModel> {
    try {
      const result = await Knex('users').where('id', _userId);
      if (result && result.length) {
        return new UserModel(result[0]);
      }
    } catch (_error) {
      throw new ClientError(500, `Failed to find user for id: ${_userId}`, _error);
    }
    throw new ClientError(500, `Failed to find user for id: ${_userId}`);
  }
}
