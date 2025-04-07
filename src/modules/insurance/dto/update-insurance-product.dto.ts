import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { PolicyType } from '@prisma/client';

export class UpdateInsuranceProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsEnum(PolicyType, { message: 'Invalid policy type' })
  @IsOptional()
  type?: PolicyType;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'Base price must be a number' })
  @IsOptional()
  basePrice?: number;

  @IsString({ message: 'Coverage details must be a string' })
  @IsOptional()
  coverageDetails?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
