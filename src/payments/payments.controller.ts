import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  async createPaymentIntent(@Body() body: { total: number }) {
    // Create PaymentIntent
    const { clientSecret, id } = await this.paymentsService.createPaymentIntent(
      body.total,
    );

    // Return both clientSecret (for frontend) and id (to save booking)
    return { clientSecret, paymentIntentId: id };
  }
}
