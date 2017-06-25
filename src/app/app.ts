import * as http from 'http';

import * as express from 'express';

import { Assert, Configuration, Network } from './../shared/utils';
import { Server } from './../shared/server';
import { Service } from './../shared/service';
import { Controller } from './../shared/controller';
import { AppController } from './app.controller';

export class App extends Server {
  public static readonly PROTOCOL: string = 'http';

  private _address: string;
  private _fullAddress: string;
  private _port: number;
  private _path: string;
  private _fullPath: string;

  private _httpServer: http.Server;
  private _expressApp: express.Application;
  private _services: { [_name: string]: Service } = {};
  private _controller: { [_name: string]: Controller } = {};

  public get protocol(): string {
    return App.PROTOCOL;
  }
  public get address(): string {
    return this._address;
  }
  public get fullAddress(): string {
    return this._fullAddress;
  }
  public get port(): number {
    return this._port;
  }
  public get path(): string {
    return this._path;
  }
  public get fullPath(): string {
    return this._fullPath;
  }
  public get httpServer(): http.Server {
    return this._httpServer;
  }
  public get expressApp(): express.Application {
    return this._expressApp;
  }

  public constructor() {
    super();
    this.initialize();
  }

  public getService<T extends Service>(_name: string): T {
    if (_name in this._services) {
      return this._services[_name] as T;
    }
    return Assert.fail(`App: Service '${_name}' does not exist`);
  }
  public getController<T extends Controller>(_name: string): T {
    if (_name in this._controller) {
      return this._controller[_name] as T;
    }
    return Assert.fail(`App: Controller '${_name}' does not exist`);
  }

  public run(): void {
    Assert.check(this._httpServer !== null, 'App: Server is not initialized');
    this._httpServer.listen(this.port, this.address);
  }

  private initialize(): void {
    this.initializeServices();
    this.initializeServer();
    this.initializeController();
  }

  private initializeServices(): void {
    /**
     * TODO(jsh): Add some nice Services!
     */
  }

  private initializeServer(): void {
    this._port = Configuration.get<number>('server.port');
    this._address = Network.normalizeAddress(Configuration.get<string>('server.address'));
    this._fullAddress = Network.generateFullAddress(this.protocol, this._address, this._port);

    this._expressApp = express();
    /**
     *  TODO(jsh): Change to HTTPS in `production` mode.
     */
    this._httpServer = http.createServer(this._expressApp);
    this._httpServer.on('error', (error: Error) => this.onHttpError(error));
    this._httpServer.on('listening', () => this.onHttpListening());

    this._expressApp.set('server', this);
  }

  private initializeController(): void {
    const appController = this.addController(new AppController(this)).mount();

    this._path = appController.path;
    this._fullPath = Network.concatPath(this._fullAddress, this._path);
  }

  private onHttpError(_error: NodeJS.ErrnoException): void {
    if (_error.syscall !== 'listen') {
      throw _error;
    }

    switch (_error.code) {
      case 'EACCES': {
        // this.mLoggerService.error(`"${this.mServerConfig.hostName}:${this.mServerConfig.port}" requires elevated privileges.`);
        process.exit(1);
        break;
      }
      case 'EADDRINUSE': {
        // this.mLoggerService.error(`"${this.mServerConfig.hostName}:${this.mServerConfig.port}" is already in use.`);
        process.exit(1);
        break;
      }
      default: {
        throw _error;
      }
    }
  }

  private onHttpListening(): void {
    // const address = this._httpServer.address();
    // const addressAndPort = _.isString(address) ? `${address}` : `${address.family}:${address.address}:${address.port}`;
  }

  /*
  private addService<T extends Service>(_service: T, _asName?: string): T {
    const name = _asName || _service.name;
    if (name in this._services) {
      return Assert.fail(`App: Service '${name}' already exists`);
    }
    this._services[name] = _service;
    return _service;
  } */

  private addController<T extends Controller>(_controller: T, _asName?: string): T {
    const name = _asName || _controller.name;
    if (name in this._controller) {
      return Assert.fail(`App: Controller '${name}' already exists`);
    }
    this._controller[name] = _controller;
    return _controller;
  }
}
