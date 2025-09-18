// import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

// export class CreateBookingDto {
//   @IsArray()
//   items: any[];

//   @IsNumber()
//   total: number;

//   @IsString()
//   paymentMethod: string;

//   @IsOptional()
//   @IsString()
//   date: string;

//   @IsOptional()
//   @IsString()
//   address: string;

//   @IsOptional()
//   @IsString()
//   password: string;
// }

import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class BookingItemDto {
  @IsString()
  product_id: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  subtotal: number;
}

class CustomerDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}

class ShippingDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postal_code: string;

  @IsString()
  country: string;

  @IsString()
  delivery_method: string;

  @IsNumber()
  delivery_fee: number;
}

export class CreateBookingDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingItemDto)
  items: BookingItemDto[];

  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsOptional()
  @IsString()
  paymentIntentId?: string;

  @ValidateNested()
  @Type(() => ShippingDto)
  shipping: ShippingDto;

  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  date?: string;
}
