import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import {
  PaginationDto,
  createPaginatedResponse,
} from '../../common/helpers/pagination.helper';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async create(createBillingDto: CreateBillingDto) {
    return await this.prisma.billing.create({
      data: createBillingDto,
    });
  }

  async findAll(
    query?: { productCode?: string; location?: string },
    pagination?: PaginationDto,
  ) {
    const where = {
      ...(query?.productCode && { productCode: query.productCode }),
      ...(query?.location && { location: query.location }),
    };

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      this.prisma.billing.count({ where }),
      this.prisma.billing.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async update(
    id: string,
    updateData: { location: string; premiumPaid: number },
  ) {
    try {
      return await this.prisma.billing.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Billing record with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.billing.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Billing record with ID ${id} not found`);
      }
      throw error;
    }
  }
}
