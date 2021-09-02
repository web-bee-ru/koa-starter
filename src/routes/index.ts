import Koa, { Context } from 'koa';
import Router from 'koa-router';
import requireDir from 'require-dir';
import urljoin from 'url-join';
import error from 'koa-json-error';

interface RouteConfig {
  prefix: string;
}

interface App {
  app: Koa;
}

interface Dir {
  [path: string]: any;
}

export type TRegisterRoute = () => Router;

export default function registerRoutes(ctx: App) {
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

function registerDir(dir: Dir, ctx: App, config: RouteConfig) {
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
      const registerRoute = required.default as TRegisterRoute;
      const router = registerRoute();
      console.info('route added: ', routePrefix);
      app.use(router.routes());
      return;
    }
    throw new Error(`route file is incorrect: ${routePrefix}`);
  });
}

type PathParams<Path extends string> = Path extends `:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `:${infer Param}`
  ? Param
  : Path extends `${infer _Prefix}:${infer Rest}`
  ? PathParams<`:${Rest}`>
  : never;

type PathArgs<Path extends string> = {
  [K in PathParams<Path>]: string;
};
export class ParamedRouters<T, K> extends Router {
  paramedGet<P extends string>(path: P, handler: (ctx: Context & { params: PathArgs<P> }) => Promise<void>): Router {
    return this.get(path, handler);
  }

  paramedPost<P extends string>(path: P, handler: (ctx: Context & { params: PathArgs<P> }) => Promise<void>): Router {
    return this.post(path, handler);
  }

  paramedDel<P extends string>(path: P, handler: (ctx: Context & { params: PathArgs<P> }) => Promise<void>): Router {
    return this.del(path, handler);
  }

  paramedPut<P extends string>(path: P, handler: (ctx: Context & { params: PathArgs<P> }) => Promise<void>): Router {
    return this.put(path, handler);
  }

  paramedAll<P extends string>(path: P, handler: (ctx: Context & { params: PathArgs<P> }) => Promise<void>): Router {
    return this.all(path, handler);
  }
}
