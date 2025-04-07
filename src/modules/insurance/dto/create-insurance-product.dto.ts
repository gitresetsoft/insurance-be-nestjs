import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { PolicyType } from '@prisma/client';

export class CreateInsuranceProductDto {
  @IsString({ message: 'Name is required' })
  name: string;

  @IsEnum(PolicyType, { message: 'Invalid policy type' })
  type: PolicyType;

  @IsString({ message: 'Description is required' })
  description: string;

  @IsNumber({}, { message: 'Base price must be a number' })
  basePrice: number;

  @IsString({ message: 'Coverage details are required' })
  coverageDetails: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
