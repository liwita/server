export interface UserModelProperties {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  modified?: string;
  created?: string;
}

export class UserModel implements UserModelProperties {
  public readonly id?: number;
  public readonly username?: string;
  public readonly firstname?: string;
  public readonly lastname?: string;
  public readonly email?: string;
  public readonly modified?: string;
  public readonly created?: string;

  public constructor(_args: UserModelProperties) {
    ({
      id: this.id,
      username: this.username,
      firstname: this.firstname,
      email: this.email,
      modified: this.modified,
      created: this.created
    } = _args);
  }
}
