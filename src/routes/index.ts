import Koa from 'koa';
import Router from 'koa-router';
import requireDir from 'require-dir';
import urljoin from 'url-join';
import error from 'koa-json-error';

interface RouteConfig {
  prefix: string;
}

interface Context {
  app: Koa;
}

interface Dir {
  [path: string]: any;
}

export default function registerRoutes(ctx: Context) {
  const { app } = ctx;
  app.use(
    error({
      postFormat: (err, formattedError) => {
        return {
          // Copy some attributes from the original error
          status: formattedError?.status,
          message: err.message,
          // ...or add some custom ones
          success: false,
          reason: 'Unexpected',
        };
      },
    }),
  );

  const dir = requireDir('./', { recurse: true });
  registerDir(dir, ctx, {
    prefix: '',
  });

  // фикс бесконечной загрузки, если путь запроса не существует
  const router = new Router();
  router.all('(.*)', (koaContext) => {
    koaContext.throw(404);
  });

  app.use(router.routes());
}

function registerDir(dir: Dir, ctx: Context, config: RouteConfig) {
  const { app } = ctx;
  Object.keys(dir).forEach((key) => {
    let routePrefix = urljoin(config.prefix, key);
    if (routePrefix.endsWith('/index')) {
      routePrefix = routePrefix.slice(0, -'/index'.length);
    }
    const required = dir[key];
    if (typeof required === 'object' && typeof required.default !== 'function') {
      registerDir(required, ctx, {
        prefix: routePrefix,
      });
      return;
    } else if (typeof required.default === 'function') {
      const registerRoute = required.default as () => Router;
      const router = registerRoute();
      console.info('route added: ', routePrefix);
      app.use(router.routes());
      return;
    }
    throw new Error(`route file is incorrect: ${routePrefix}`);
  });
}
