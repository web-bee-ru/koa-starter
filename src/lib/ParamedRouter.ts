/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Context } from 'koa';
import Router from 'koa-router';

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

export default class ParamedRouters<Prefix extends string = '', StateT = any, CustomT = {}> extends Router<StateT, CustomT> {
  pGet<P extends string, Params extends PathArgs<P> & PathArgs<Prefix>>(
    path: P,
    handler: (ctx: Context & { params: Params }) => Promise<void>,
  ): Router {
    return super.get(path, handler);
  }

  pPost<P extends string, Params extends PathArgs<P> & PathArgs<Prefix>>(
    path: P,
    handler: (ctx: Context & { params: Params }) => Promise<void>,
  ): Router {
    return super.post(path, handler);
  }

  pDel<P extends string, Params extends PathArgs<P> & PathArgs<Prefix>>(
    path: P,
    handler: (ctx: Context & { params: Params }) => Promise<void>,
  ): Router {
    return super.del(path, handler);
  }

  pPut<P extends string, Params extends PathArgs<P> & PathArgs<Prefix>>(
    path: P,
    handler: (ctx: Context & { params: Params }) => Promise<void>,
  ): Router {
    return super.put(path, handler);
  }

  pAll<P extends string, Params extends PathArgs<P> & PathArgs<Prefix>>(
    path: P,
    handler: (ctx: Context & { params: Params }) => Promise<void>,
  ): Router {
    return super.all(path, handler);
  }
}
