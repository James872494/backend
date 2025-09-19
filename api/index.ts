import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';
import type { Request, Response } from 'express';

let serverlessHandler: ReturnType<typeof serverless> | null = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();

  // Get NestJS's internal Express instance
  const nestExpressApp = app.getHttpAdapter().getInstance();

  return serverless(nestExpressApp);
}

// Vercel handler
export default async function handler(req: Request, res: Response) {
  if (!serverlessHandler) {
    serverlessHandler = await bootstrap();
  }
  return serverlessHandler(req, res);
}
