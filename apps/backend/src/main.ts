import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { tRPCService } from './modules/trpc/trpc.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  const trpcService = app.get(tRPCService)
  trpcService.applyMiddleware(app)

  await app.listen(3001);
}
bootstrap();
