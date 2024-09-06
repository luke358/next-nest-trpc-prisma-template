import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TopicTrpcRouter } from './topic.trpc';
import { UserModule } from '../user/user.module';

@Module({
  imports: [],
  providers: [TopicService, TopicTrpcRouter],
  controllers: [TopicController],
  exports: [TopicService, TopicTrpcRouter],
})
export class TopicModule { }
