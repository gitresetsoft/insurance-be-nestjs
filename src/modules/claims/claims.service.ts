import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ClaimStatus } from '@prisma/client';

@Injectable()
export class ClaimsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.claim.findMany({
      include: {
        user: true,
        policy: true,
      },
    });
  }

  async findOne(id: string) {
    const claim = await this.prisma.claim.findUnique({
      where: { id },
      include: {
        user: true,
        policy: true,
      },
    });

    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }

    return claim;
  }

  async findByUserId(userId: string) {
    return await this.prisma.claim.findMany({
      where: { userId },
      include: {
        policy: true,
      },
    });
  }

  async findByPolicy(policyId: string) {
    return await this.prisma.claim.findMany({
      where: { policyId },
      include: {
        user: true,
      },
    });
  }

  async findByStatus(status: ClaimStatus) {
    return await this.prisma.claim.findMany({
      where: { status },
      include: {
        user: true,
        policy: true,
      },
    });
  }

  async create(createClaimDto: CreateClaimDto, userId: string) {
    // Check if creating own claims
    if (createClaimDto.userId !== userId) {
      throw new NotFoundException(
        `User with ID ${createClaimDto.userId} not found`,
      );
    }

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createClaimDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createClaimDto.userId} not found`,
      );
    }

    // Check if policy exists
    const policy = await this.prisma.policy.findUnique({
      where: { id: createClaimDto.policyId },
    });

    if (!policy) {
      throw new NotFoundException(
        `Policy with ID ${createClaimDto.policyId} not found`,
      );
    }

    // Check if the policy belongs to the user
    if (policy.userId !== createClaimDto.userId) {
      throw new NotFoundException(
        `Policy with ID ${createClaimDto.policyId} does not belong to user with ID ${createClaimDto.userId}`,
      );
    }

    return await this.prisma.claim.create({
      data: createClaimDto,
      include: {
        user: true,
        policy: true,
      },
    });
  }

  async update(id: string, updateClaimDto: UpdateClaimDto) {
    const claim = await this.prisma.claim.findUnique({
      where: { id },
    });

    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }

    // If userId is being updated, check if the new user exists
    if (updateClaimDto.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: updateClaimDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateClaimDto.userId} not found`,
        );
      }
    }

    // If policyId is being updated, check if the new policy exists
    if (updateClaimDto.policyId) {
      const policy = await this.prisma.policy.findUnique({
        where: { id: updateClaimDto.policyId },
      });

      if (!policy) {
        throw new NotFoundException(
          `Policy with ID ${updateClaimDto.policyId} not found`,
        );
      }

      // Check if the policy belongs to the user
      if (updateClaimDto.userId && policy.userId !== updateClaimDto.userId) {
        throw new NotFoundException(
          `Policy with ID ${updateClaimDto.policyId} does not belong to user with ID ${updateClaimDto.userId}`,
        );
      }
    }

    return await this.prisma.claim.update({
      where: { id },
      data: updateClaimDto,
      include: {
        user: true,
        policy: true,
      },
    });
  }

  async updateStatus(id: string, updateStatusDto: { status: ClaimStatus }) {
    // Fetch the existing claim
    const claim = await this.prisma.claim.findUnique({
      where: { id },
    });

    // Check if the claim exists
    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }

    // Update the claim with the new status
    return await this.prisma.claim.update({
      where: { id },
      data: { status: updateStatusDto.status },
      include: {
        user: true,
        policy: true,
      },
    });
  }

  async remove(id: string) {
    const claim = await this.prisma.claim.findUnique({
      where: { id },
    });

    if (!claim) {
      throw new NotFoundException(`Claim with ID ${id} not found`);
    }

    return await this.prisma.claim.delete({
      where: { id },
    });
  }
}
