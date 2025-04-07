import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PolicyStatus } from '@prisma/client';

export class UpdatePolicyDto {
  @IsString({ message: 'Policy number must be a string' })
  @IsOptional()
  policyNumber?: string;

  @IsEnum(PolicyStatus, { message: 'Invalid policy status' })
  @IsOptional()
  status?: PolicyStatus;

  @IsDate({ message: 'Start date must be a valid date' })
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate({ message: 'End date must be a valid date' })
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber({}, { message: 'Premium must be a number' })
  @IsOptional()
  premium?: number;

  @IsNumber({}, { message: 'Coverage limit must be a number' })
  @IsOptional()
  coverageLimit?: number;

  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsOptional()
  userId?: string;

  @IsUUID('4', { message: 'Insurance product ID must be a valid UUID' })
  @IsOptional()
  insuranceProductId?: string;
}
