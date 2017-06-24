import * as assert from 'assert';

import * as _ from 'lodash';
import * as express from 'express';

import { Network } from './../utils';
import { Server } from './../server';

export abstract class Controller {
  private _name: string;
  private _parent: (Controller | null);
  private _router: express.Router;
  private _path: string;

  public get name(): string {
    return this._name;
  }
  public get server(): Server {
    return this._server;
  }
  public get parent(): (Controller | null) {
    return this._parent;
  }
  public get router(): express.Router {
    return this._router;
  }
  public get path(): string {
    return this._path;
  }

  public constructor(
    private _server: Server,
    _path: string,
    _options: (express.RouterOptions | null)
  ) {
    assert.ok(_.isObject(_server), 'Controller: Server not assigned');

    this._name = _.snakeCase(this.constructor.name);

    const path = _path || '/';
    this._path = Network.prefixPath(path);

    const options = _options || {
      caseSensitive: false,
      mergeParams: false,
      strict: false
    };
    this._router = express.Router(options);
  }

  public mount(_parent?: Controller): Controller {
    assert.ok(!this.parent, 'Controller: Already mounted to a parent controller');

    this._parent = _parent || null;
    this.onBeforeMount(this._parent);
    this.onMount(this._parent);
    this.onAfterMount(this._parent);

    return this;
  }

  protected onBeforeMount(_parent: (Controller | null)): void {}
  protected abstract onMount(_parent: (Controller | null)): void;
  protected onAfterMount(_parent: (Controller | null)): void {}
}
