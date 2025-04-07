import { IsString, IsNumber, IsDate, IsEnum, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PolicyStatus } from '@prisma/client';

export class CreatePolicyDto {
  @IsString({ message: 'Policy number is required' })
  policyNumber: string;

  @IsEnum(PolicyStatus, { message: 'Invalid policy status' })
  status: PolicyStatus;

  @IsDate({ message: 'Start date must be a valid date' })
  @Type(() => Date)
  startDate: Date;

  @IsDate({ message: 'End date must be a valid date' })
  @Type(() => Date)
  endDate: Date;

  @IsNumber({}, { message: 'Premium must be a number' })
  premium: number;

  @IsNumber({}, { message: 'Coverage limit must be a number' })
  coverageLimit: number;

  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  userId: string;

  @IsUUID('4', { message: 'Insurance product ID must be a valid UUID' })
  insuranceProductId: string;
}
