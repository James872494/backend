import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async createBooking(data: any): Promise<Booking> {
    const newBooking = new this.bookingModel(data);
    return newBooking.save();
  }

  async getAllBookings(): Promise<Booking[]> {
  return this.bookingModel.find().sort({ created_at: -1 }).exec();
}


  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return this.bookingModel.find({ userId }).sort({ created_at: -1 }).exec();
  }
}
