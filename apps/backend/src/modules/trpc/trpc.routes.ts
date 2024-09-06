import { TopicTrpcRouter } from "../topic/topic.trpc";
import { UserTrpcRouter } from "../user/user.trpc";
import { t } from './trpc.instance';

export type TRPCRouter = ReturnType<typeof t.mergeRouters<[
  UserTrpcRouter['router'],
  TopicTrpcRouter['router']
]>>
