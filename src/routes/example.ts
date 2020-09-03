import Router from 'koa-router';
import { Example } from '../db/models/Example';

export default function registerRoute(router: Router) {
  router.get('/', async (ctx) => {
    ctx.body = { data: 'ok' };
  });

  router.get('/all', async (ctx) => {
    ctx.body = await Example.findAll({});
  });
}
