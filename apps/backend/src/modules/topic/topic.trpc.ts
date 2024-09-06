import { Injectable, OnModuleInit } from '@nestjs/common'
import { publicProcedure, t, tRouter } from '../trpc/trpc.instance'
import { UserService } from '../user/user.service'
import { TRPCRouter } from '@server/decorators/trpc.decorator'

@TRPCRouter()
@Injectable()
export class TopicTrpcRouter implements OnModuleInit {
  // 动态注入路由
  private router: ReturnType<typeof this.createRouter>
  constructor(
    private readonly userService: UserService
  ) { }

  onModuleInit() {
    this.router = this.createRouter()
  }

  private createRouter() {
    return tRouter({
      topic: tRouter({
        getTopic: publicProcedure.query(({ ctx }) => {
          console.log(ctx.user.name);
          return this.userService.getUser(4)
        })
      })
    })
  }
}
