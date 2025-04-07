import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PolicyStatus } from '@prisma/client';

@Injectable()
export class PolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.policy.findMany({
      include: {
        user: true,
        insuranceProduct: true,
      },
    });
  }

  async findOne(id: string) {
    const policy = await this.prisma.policy.findUnique({
      where: { id },
      include: {
        user: true,
        insuranceProduct: true,
        claims: true,
      },
    });

    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }

    return policy;
  }

  async findByUser(userId: string) {
    return await this.prisma.policy.findMany({
      where: { userId },
      include: {
        insuranceProduct: true,
        claims: true,
      },
    });
  }

  async findByStatus(status: PolicyStatus) {
    return await this.prisma.policy.findMany({
      where: { status },
      include: {
        user: true,
        insuranceProduct: true,
      },
    });
  }

  async create(createPolicyDto: CreatePolicyDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createPolicyDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPolicyDto.userId} not found`,
      );
    }

    // Check if insurance product exists
    const product = await this.prisma.insuranceProduct.findUnique({
      where: { id: createPolicyDto.insuranceProductId },
    });

    if (!product) {
      throw new NotFoundException(
        `Insurance product with ID ${createPolicyDto.insuranceProductId} not found`,
      );
    }

    return await this.prisma.policy.create({
      data: createPolicyDto,
      include: {
        user: true,
        insuranceProduct: true,
      },
    });
  }

  async update(id: string, updatePolicyDto: UpdatePolicyDto) {
    const policy = await this.prisma.policy.findUnique({
      where: { id },
    });

    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }

    // If userId is being updated, check if the new user exists
    if (updatePolicyDto.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: updatePolicyDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updatePolicyDto.userId} not found`,
        );
      }
    }

    // If insuranceProductId is being updated, check if the new product exists
    if (updatePolicyDto.insuranceProductId) {
      const product = await this.prisma.insuranceProduct.findUnique({
        where: { id: updatePolicyDto.insuranceProductId },
      });

      if (!product) {
        throw new NotFoundException(
          `Insurance product with ID ${updatePolicyDto.insuranceProductId} not found`,
        );
      }
    }

    return await this.prisma.policy.update({
      where: { id },
      data: updatePolicyDto,
      include: {
        user: true,
        insuranceProduct: true,
      },
    });
  }

  async remove(id: string) {
    const policy = await this.prisma.policy.findUnique({
      where: { id },
    });

    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }

    return await this.prisma.policy.delete({
      where: { id },
    });
  }
}
