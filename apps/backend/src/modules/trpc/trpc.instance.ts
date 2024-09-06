
import { initTRPC } from '@trpc/server'
import superjson from 'superjson';

import { Context } from './trpc.context'
import { tRPCService } from './trpc.service'

export const t = initTRPC.context<Context>().create({
  // transformer: superjson,
})
export const tRouter = t.router;
export const publicProcedure = t.procedure;
export const authProcedure = t.procedure;

export type tRpcRouterType = (typeof t)['router']
export type tRpcProcedure = (typeof t)['procedure']
export type tRpc$Config = typeof t._config

// export type AppRouter = tRPCService['appRouter']
// export type RouterInputs = inferRouterInputs<AppRouter>
// export type RouterOutputs = inferRouterOutputs<AppRouter>
