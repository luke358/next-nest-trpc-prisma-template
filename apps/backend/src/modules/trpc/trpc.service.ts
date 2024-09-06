import { fastifyRequestHandler } from '@trpc/server/adapters/fastify';
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DiscoveryService, Reflector } from "@nestjs/core";
import { t } from "./trpc.instance";
import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { createContext } from './trpc.context';
import { TRPC_ROUTER } from '@server/decorators/trpc.decorator';

@Injectable()
export class tRPCService implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {
    this.logger = new Logger('tRPCService');
  }

  onModuleInit() {
    this.createAppRouter();
  }

  private logger: Logger;
  appRouter: ReturnType<typeof this.createAppRouter>;

  /**
   * 这里是通过 `反射` 来获取所有的 router，然后合并成一个大的 router。
   * 其实这里并不是很推荐，因为反射会导致性能问题，如果有很多 router ，反射会导致启动时间变长，而且容易出错。
   * 可以通过其他的方式来获取 router，比如扫描某个文件夹下的 router 文件，然后生成一个完整的 router。
   * 例如：
   * ```
   * file: user.router.ts
   * import { tRouter } from "./trpc.instance";
   * export const userRouter = t.router({ get: 'xxxx' })
   * 
   * file: post.router.ts
   * export const postRouter = t.router({ get: 'xxxx' })
   * 
   * file: index.router.ts
   * import { userRouter, postRouter } from "./routers";
   * export const appRouter = t.mergeRouters(userRouter, postRouter);
   * ```
   * @returns {ReturnType<typeof t.createRouter>}
   */
  private createAppRouter() {
    const p = this.discovery.getProviders();

    const routers = p
      .filter((provider) => {
        try {
          return this.reflector.get(TRPC_ROUTER, provider.metatype);
        } catch {
          return false;
        }
      })
      .map(({ instance }) => instance.router)
      .filter((router) => {
        if (!router) {
          this.logger.warn('missing router.');
        }

        return !!router;
      });

    const appRouter = t.mergeRouters(...routers);

    this.appRouter = appRouter;

    return appRouter;
  }

  applyMiddleware(_app: NestFastifyApplication) {
    _app.getHttpAdapter().all('/trpc/:path', async (req, res) => {
      const path = (req.params as any).path;

      await fastifyRequestHandler({
        router: this.appRouter,
        createContext,
        req,
        res,
        path,
        onError: (opts) => {
          const { error, path } = opts;
          this.logger.error(`Error in tRPC procedure '${path}':`, error);
        },
      });
    });
  }
}
