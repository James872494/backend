import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('test')
export class TestController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  async checkDb() {
    try {
      const collections =
        (await this.connection.db?.listCollections().toArray()) ?? [];
      return { status: 'ok', collections: collections.map((c) => c.name) };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }
}
