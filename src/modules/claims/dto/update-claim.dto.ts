import {
  IsString,
  IsNumber,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ClaimStatus } from '@prisma/client';

export class UpdateClaimDto {
  @IsString({ message: 'Claim number must be a string' })
  @IsOptional()
  claimNumber?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsOptional()
  amount?: number;

  @IsEnum(ClaimStatus, { message: 'Invalid claim status' })
  @IsOptional()
  status?: ClaimStatus;

  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsOptional()
  userId?: string;

  @IsUUID('4', { message: 'Policy ID must be a valid UUID' })
  @IsOptional()
  policyId?: string;
}
