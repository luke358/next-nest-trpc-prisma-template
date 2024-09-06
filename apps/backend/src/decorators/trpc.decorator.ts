
export const TRPC_ROUTER = 'TRPC_ROUTER'

export const TRPCRouter = (): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(TRPC_ROUTER, true, target)
  }
}
