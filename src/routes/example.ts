import { TRegisterRoute } from '.';
import { Example } from '../db/models/Example';
import ParamedRouters from '../lib/ParamedRouter';

const registerRoute: TRegisterRoute = () => {
  const prefix = '/:smth';
  const router = new ParamedRouters<typeof prefix>({ prefix });

  router.pGet('/', async (ctx) => {
    ctx.body = { data: 'ok' };
  });

  router.pGet('/all', async (ctx) => {
    ctx.body = await Example.findAll({});
  });

  router.pGet('/example/:sample', async (ctx) => {
    ctx.body = `${ctx.params.smth} ${ctx.params.sample}`;
  });

  return router;
};

export default registerRoute;
