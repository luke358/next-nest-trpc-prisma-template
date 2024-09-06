import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { tRPCModule } from './modules/trpc/trpc.module';
import { UserModule } from './modules/user/user.module';
import { TopicModule } from './modules/topic/topic.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,

    UserModule,
    TopicModule,
    // tRPCModule会动态获取所有 TRPC_ROUTE 定义的路由，并注册到 tRPC，因此需要等待其他所有的 module 注入完成后
    tRPCModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
