import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { PaymentsService } from '../payments/payments.service';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly paymentsService: PaymentsService,
  ) {}

  private generateOrderNumber(): string {
    return `QC${Math.floor(10000 + Math.random() * 90000)}`;
  }

  @Post()
  async createBooking(@Body() body: any) {
    const {
      userId,
      paymentMethod,
      items,
      customer,
      shipping,
      paymentIntentId,
    } = body;

    if (!userId) throw new BadRequestException('Supabase user ID is required');

    let transactionId = '';
    let currency = 'USD';
    const methodMap = { card: 'Stripe', paypal: 'PayPal', cash: 'Cash' };
    const method = methodMap[paymentMethod.toLowerCase()] || paymentMethod;

    if (method === 'Stripe') {
      if (!paymentIntentId)
        throw new BadRequestException('Stripe Payment Intent ID is required');

      const paymentIntent =
        await this.paymentsService.retrievePaymentIntent(paymentIntentId);

      if (paymentIntent.status !== 'succeeded') {
        throw new BadRequestException('Payment not successful');
      }

      transactionId = paymentIntent.id;
      currency = paymentIntent.currency.toUpperCase();
    }

    const itemsTotal = items.reduce((sum, i) => sum + i.subtotal, 0);
    const totalAmount = itemsTotal + shipping.delivery_fee;

    const bookingData = {
      userId, // Supabase user ID
      orderNumber: this.generateOrderNumber(),
      customer,
      shipping,
      items,
      payment: {
        method,
        status: method === 'Stripe' ? 'Paid' : 'Pending',
        transaction_id: transactionId,
        currency,
        amount_total: totalAmount,
      },
      status: 'Processing',
      created_at: new Date().toISOString(),
    };

    return this.bookingService.createBooking(bookingData);
  }

  @Get('my-bookings/:userId')
  async getMyBookings(@Param('userId') userId: string) {
    return this.bookingService.getBookingsByUser(userId);
  }

  @Get()
async getAllBookings() {
  return this.bookingService.getAllBookings();
}

}
