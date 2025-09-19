import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';
import express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, expressApp);
  app.enableCors();
  await app.init(); // required for serverless
}
bootstrap();

export default serverless(expressApp);
