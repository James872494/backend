// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type BookingDocument = Booking & Document;

// @Schema()
// export class Booking {
//   @Prop({ required: true })
//   items: any[];

//   @Prop({ required: true })
//   total: number;

//   @Prop({ required: true })
//   paymentMethod: string;

//   @Prop({ required: true })
//   date: string;

//   @Prop({ required: true })
//   address: string;
// }

// export const BookingSchema = SchemaFactory.createForClass(Booking);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  // Explicitly define nested object
  @Prop({ required: true, type: Object })
  customer: {
    name: string;
    email: string;
    phone: string;
  };

  @Prop({ required: true, type: Object })
  shipping: {
    address: string;
    city: string;
    postal_code: string;
    country: string;
    delivery_method: string;
    delivery_fee: number;
  };

  @Prop({
    type: [
      {
        product_id: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        subtotal: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: {
    product_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];

  @Prop({
    required: true,
    type: Object,
  })
  payment: {
    method: string;
    status: string;
    transaction_id: string;
    currency: string;
    amount_total: number;
  };

  @Prop({ default: 'Processing' })
  status: string;

  @Prop({ default: () => new Date().toISOString() })
  created_at: string;

  @Prop({ required: true })
  userId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
