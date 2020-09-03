import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import registerRoutes from './routes';
import { initDatabase } from './db';

async function main() {
  const app = new Koa();
  const PORT = process.env.PORT;

  /** Init Database */
  await initDatabase();

  /** Middlewares */
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  /** Routes */
  registerRoutes({ app });

  await app.listen(PORT);
  console.info(`Server started: http://localhost:${PORT}`);
  await new Promise((resolve) => process.on('SIGINT', resolve));
  return 0;
}

main()
  .then((code) => {
    process.exit(code);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
