import Router from 'koa-router';
import { Example } from '../db/models/Example';

const registerRoute: () => Router = () => {
  let router = new Router();

  router.get('/', async (ctx) => {
    ctx.body = { data: 'ok' };
  });

  router.get('/all', async (ctx) => {
    ctx.body = await Example.findAll({});
  });

  return router;
};

export default registerRoute;
