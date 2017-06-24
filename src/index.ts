import { App } from './app';

const main = (): void => {
  try {
    const app = new App();
    app.run();
  } catch (_error) {
    console.error('FATAL ERROR', _error);
    process.exitCode = 1;
  }
};

main();
