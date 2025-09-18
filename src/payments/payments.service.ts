import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil', // your current version
});

@Injectable()
export class PaymentsService {
  // Create a PaymentIntent
  async createPaymentIntent(amount: number, currency = 'usd') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
      automatic_payment_methods: {
        enabled: true, // ✅ Let Stripe automatically handle card/payment method
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    };
  }

  // Retrieve a PaymentIntent
  async retrievePaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.retrieve(paymentIntentId);
  }

  // Confirm payment server-side (optional)
  async confirmPayment(paymentIntentId: string) {
    return stripe.paymentIntents.confirm(paymentIntentId);
  }
}
