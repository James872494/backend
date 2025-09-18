// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ default: false })
//   isVerified: boolean;

//   @Prop({ required: true })
//   supabaseId: string; // Reference Supabase auth ID
// }

// export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  supabaseId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  createdAt: Date;

  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
