import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module'; // use ProductModule
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModule } from './booking/booking.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ProductModule, // use the correct name
    MongooseModule.forRoot(
      'mongodb+srv://jamesmutembedza87:bmut2122@cluster0.4qvaj2v.mongodb.net/quikcart?retryWrites=true&w=majority',
    ),
    BookingModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
