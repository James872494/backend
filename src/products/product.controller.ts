import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';

const BACKEND_URL = 'http://192.168.1.220:3000';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product> {
    // Use full URL for React Native
    const imageUrl = file?.filename
      ? `${BACKEND_URL}/uploads/${file.filename}`
      : undefined;
    return this.productService.create({ ...createProductDto, image: imageUrl });
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('featured')
  async findFeatured(): Promise<Product[]> {
    return this.productService.findFeatured();
  }
}
