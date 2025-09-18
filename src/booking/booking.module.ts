import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingSchema } from './schemas/booking.schema';
import { PaymentsService } from '../payments/payments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
  ],
  providers: [BookingService, PaymentsService],
  controllers: [BookingController],
})
export class BookingModule {}
