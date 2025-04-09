import { IsString, IsNumber, IsDate, IsEnum, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PolicyStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyDto {
  @ApiProperty({
    description: 'Unique policy number',
    example: 'POL-2024-001',
  })
  @IsString({ message: 'Policy number is required' })
  policyNumber: string;

  @ApiProperty({
    description: 'Current status of the policy',
    enum: PolicyStatus,
    example: PolicyStatus.ACTIVE,
  })
  @IsEnum(PolicyStatus, { message: 'Invalid policy status' })
  status: PolicyStatus;

  @ApiProperty({
    description: 'Policy start date',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate({ message: 'Start date must be a valid date' })
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Policy end date',
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate({ message: 'End date must be a valid date' })
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    description: 'Policy premium amount',
    example: 1200.00,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Premium must be a number' })
  premium: number;

  @ApiProperty({
    description: 'Maximum coverage amount',
    example: 50000.00,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Coverage limit must be a number' })
  coverageLimit: number;

  @ApiProperty({
    description: 'ID of the policy holder',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  userId: string;

  @ApiProperty({
    description: 'ID of the insurance product',
    example: '987fcdeb-51a2-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'Insurance product ID must be a valid UUID' })
  insuranceProductId: string;
}
