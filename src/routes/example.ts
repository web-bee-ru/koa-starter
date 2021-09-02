import Router from 'koa-router';
import { ParamedRouters } from '.';
import { Example } from '../db/models/Example';

const registerRoute: () => Router = () => {
  let router = new ParamedRouters();

  router.get('/', async (ctx) => {
    ctx.body = { data: 'ok' };
  });

  router.get('/all', async (ctx) => {
    ctx.body = await Example.findAll({});
  });

  router.paramedGet('/example/:str', async (ctx) => {
    ctx.body = ctx.params.str;
  });

  return router;
};

export default registerRoute;
