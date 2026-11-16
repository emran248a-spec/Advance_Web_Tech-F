import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './products.service.js';

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  // CREATE PRODUCT
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // GET ALL PRODUCTS
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // SEARCH PRODUCT
  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.productsService.search(keyword);
  }

  // FILTER BY CATEGORY
  @Get('category/:cat')
  findByCategory(@Param('cat') category: string) {
    return this.productsService.findByCategory(category);
  }

  // TOGGLE PRODUCT STATUS
  @Patch(':id/toggle')
  toggleActive(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.toggleActive(id);
  }

  // GET PRODUCT BY ID
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.findOne(id);
  }

  // PARTIAL UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PartialUpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  // FULL UPDATE
  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.replace(id, dto);
  }

  // DELETE PRODUCT
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.remove(id);
  }
}