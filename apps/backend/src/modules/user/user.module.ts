import { Global, Module } from '@nestjs/common'

import { UserTrpcRouter } from './user.trpc'
import { UserService } from './user.service'

@Module({
  providers: [UserTrpcRouter, UserService],
  imports: [],
  exports: [UserService, UserTrpcRouter],
})
@Global()
export class UserModule { }
