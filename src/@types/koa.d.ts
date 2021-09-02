import { Context } from 'koa';
import Router from 'koa-router';

declare module 'koa' {
  interface Context {
    params: {
      [k: string]: string;
    };
  }
}

export {};
