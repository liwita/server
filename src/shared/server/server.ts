import * as http from 'http';

import * as express from 'express';

import { Service } from './../service';
import { Controller } from './../controller';

export abstract class Server {
  public abstract get protocol(): string;
  public abstract get address(): string;
  public abstract get fullAddress(): string;
  public abstract get port(): number;
  public abstract get path(): string;
  public abstract get fullPath(): string;
  public abstract get httpServer(): http.Server;
  public abstract get expressApp(): express.Application;

  public abstract getService<T extends Service>(_name: string): T;
  public abstract getController<T extends Controller>(_name: string): T;
}
