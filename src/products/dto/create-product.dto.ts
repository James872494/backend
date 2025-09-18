import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  oldPrice?: number;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  subCategory: string;

  @IsOptional()
  rating: number;

  @IsOptional()
  numOfRaters: number;

  @IsOptional()
  image?: string;
}
