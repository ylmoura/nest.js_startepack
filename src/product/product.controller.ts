import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const getProductById = await this.productService.getProductById(id);
    return getProductById;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const deleteProductById = await this.productService.deleteProduct(id);
    return deleteProductById;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStockDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateStockDto);
  }
  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productService.createProduct({ ...product });
  }
}
