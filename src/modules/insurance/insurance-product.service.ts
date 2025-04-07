import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateInsuranceProductDto } from './dto/create-insurance-product.dto';
import { UpdateInsuranceProductDto } from './dto/update-insurance-product.dto';
import { PolicyType } from '@prisma/client';

@Injectable()
export class InsuranceProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.insuranceProduct.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.insuranceProduct.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Insurance product with ID ${id} not found`);
    }

    return product;
  }

  async create(createInsuranceProductDto: CreateInsuranceProductDto) {
    return await this.prisma.insuranceProduct.create({
      data: createInsuranceProductDto,
    });
  }

  async update(
    id: string,
    updateInsuranceProductDto: UpdateInsuranceProductDto,
  ) {
    const product = await this.prisma.insuranceProduct.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Insurance product with ID ${id} not found`);
    }

    return this.prisma.insuranceProduct.update({
      where: { id },
      data: updateInsuranceProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.prisma.insuranceProduct.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Insurance product with ID ${id} not found`);
    }

    return this.prisma.insuranceProduct.delete({
      where: { id },
    });
  }

  async findActiveProducts() {
    return await this.prisma.insuranceProduct.findMany({
      where: { isActive: true },
    });
  }

  async findByType(type: string) {
    return await this.prisma.insuranceProduct.findMany({
      where: { type: type as PolicyType },
    });
  }
}
