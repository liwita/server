export interface UserModelProperties {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  modified?: string;
  created?: string;
}

export class UserModel {
  private readonly _id?: number;
  private readonly _username?: string;
  private readonly _firstname?: string;
  private readonly _lastname?: string;
  private readonly _email?: string;
  private readonly _modified?: string;
  private readonly _created?: string;

  public get id(): number {
    return this._id || -1;
  }
  public get username(): (string | null) {
    return this._username || null;
  }
  public get lastname(): (string | null) {
    return this._lastname || null;
  }
  public get email(): (string | null) {
    return this._email || null;
  }
  public get modified(): (string | null) {
    return this._modified || null;
  }
  public get created(): (string | null) {
    return this._created || null;
  }

  public constructor(_args: UserModelProperties) {
    ({
      id: this._id,
      username: this._username,
      firstname: this._firstname,
      lastname: this._lastname,
      email: this._email,
      modified: this._modified,
      created: this._created
    } = _args);
  }

  public toUpdatable(): UserModel {
    /**
     * TODO: Check if the value is still assigned, even if the property is undefined...
     */
    return new UserModel({
      username: this._username,
      firstname: this._firstname,
      lastname: this._lastname,
      email: this._email
    });
  }
}
