import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Products } from './entities/product.entity.js';

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  // CREATE PRODUCT
  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);

    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  // GET ALL PRODUCTS
  async findAll() {
    const products = await this.productsRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      message: 'Products retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  // GET PRODUCT BY ID
  async findOne(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    return {
      message: 'Product found successfully',
      data: product,
    };
  }

  // PARTIAL UPDATE (PATCH)
  async update(
    id: number,
    dto: PartialUpdateProductDto,
  ) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    await this.productsRepo.update(id, dto);

    const updatedProduct = await this.productsRepo.findOne({
      where: { id },
    });

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  // FULL REPLACEMENT (PUT)
  async replace(
    id: number,
    dto: UpdateProductDto,
  ) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    product.name = dto.name;
    product.description = dto.description ?? null;
    product.price = dto.price;
    product.stock = dto.stock ?? 0;
    product.category = dto.category;
    product.isActive = dto.isActive ?? true;

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: updatedProduct,
    };
  }

  // DELETE PRODUCT
  async remove(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id: id,
    };
  }

  // FILTER BY CATEGORY
  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category },
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      message: 'Products filtered by category',
      count: products.length,
      data: products,
    };
  }

  // SEARCH BY PRODUCT NAME
  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: {
        name: ILike(`%${keyword}%`),
      },
    });

    return {
      message: 'Product search completed',
      count: products.length,
      data: products,
    };
  }

  // TOGGLE ACTIVE STATUS
  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    product.isActive = !product.isActive;

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product status changed successfully',
      data: updatedProduct,
    };
  }
}