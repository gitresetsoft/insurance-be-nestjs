import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { PolicyType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInsuranceProductDto {
  @ApiProperty({
    description: 'Name of the insurance product',
    example: 'Comprehensive Car Insurance',
  })
  @IsString({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Type of insurance policy',
    enum: PolicyType,
    example: PolicyType.CAR,
  })
  @IsEnum(PolicyType, { message: 'Invalid policy type' })
  type: PolicyType;

  @ApiProperty({
    description: 'Detailed description of the insurance product',
    example: 'Comprehensive coverage for all types of vehicle damage and third-party liability',
  })
  @IsString({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Base price of the insurance product',
    example: 599.99,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Base price must be a number' })
  basePrice: number;

  @ApiProperty({
    description: 'Detailed coverage information',
    example: 'Includes collision coverage up to $50,000, personal injury protection, and roadside assistance',
  })
  @IsString({ message: 'Coverage details are required' })
  coverageDetails: string;

  @ApiProperty({
    description: 'Whether the insurance product is currently active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
