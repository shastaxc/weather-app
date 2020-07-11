import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: true,
      optionsSuccessStatus: 200, // Some legacy browsers still choke on 204
    }
  });
  await app.listen(3000);
}
bootstrap();
