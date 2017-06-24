import * as express from 'express';

import { CustomError } from './../shared/error';
import { Environment } from './../shared/utils';
import { Server } from './../shared/server';
import { Controller } from './../shared/controller';

export class AppController extends Controller {
  public static readonly PATH: string = 'api';

  public constructor(_server: Server) {
    super(_server, AppController.PATH, null);
  }

  protected onBeforeMount(_parent: (Controller | null)): void {
    /**
     * TODO(jsh): Add helmet
     */
    // _app.use(helmet());

    if (!Environment.IS_PRODUCTION_MODE) {
      /**
       * TODO(jsh): Add winston: https://github.com/winstonjs/winston
       */
      // this.server.expressApp.use(morgan('dev'));
    }
  }

  protected onMount(_parent: (Controller | null)): void {
    this.server.expressApp.use(this.path, this.router);
  }

  protected onAfterMount(_parent: (Controller | null)): void {
    this.mountDefaultRoute();
    this.mountErrorHandler();
  }

  private mountDefaultRoute(): void {
    this.server.expressApp.use(
      (_request: express.Request, _response: express.Response, _next: express.NextFunction) => {
        /**
         * TODO(jsh): Later on throw a 401 unauthorized...
         */
        _next(new CustomError(500, `Ooops, something went wrong!`));
      }
    );
  }

  /**
   * NOTE: Installs a global express error handler
   */
  private mountErrorHandler(): void {
    this.server.expressApp.use(
      (
        _error: any,
        _request: express.Request,
        _response: express.Response,
        _next: express.NextFunction
      ) => {
        if (_error instanceof CustomError) {
          const error = _error as CustomError;
          _response
            .status(error.status)
            .type('application/json')
            .json({ status: 'error', code: error.name, message: error.message });
        } else {
          _response.sendStatus(500);
        }
      }
    );
  }
}
