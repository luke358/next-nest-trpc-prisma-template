import { Injectable, OnModuleInit } from '@nestjs/common'
import { publicProcedure, tRouter } from '../trpc/trpc.instance'
import { UserService } from './user.service'
import { TRPCRouter } from '@server/decorators/trpc.decorator'
import { tRPCService } from '../trpc/trpc.service'
import { PrismaService } from '@server/prisma/prisma.service'
import { create } from 'domain'
import { z } from 'zod'

@TRPCRouter()
@Injectable()
export class UserTrpcRouter implements OnModuleInit {
  // 动态注入路由
  public router: ReturnType<typeof this.createRouter>
  constructor(
    private readonly userService: UserService,
  ) { }

  onModuleInit() {
    this.router = this.createRouter()
  }

  private createRouter() {
    return tRouter({
      user: tRouter({
        list: publicProcedure.query(({ ctx }) => {
          console.log(ctx.user.name);
          return this.userService.list()
        }),
        create: publicProcedure.input(z.object({
          name: z.string(),
          email: z.string(),
        })).mutation(({ input }) => {
          return this.userService.create(input)
        }),
      }),
    })
  }
  getRouter() {
    return this.router;
  }
}
