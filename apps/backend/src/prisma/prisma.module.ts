import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 将模块声明为全局模块
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 导出 PrismaService，以便其他模块使用
})
export class PrismaModule {}
