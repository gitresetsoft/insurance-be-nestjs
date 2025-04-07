import { IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { ClaimStatus } from '@prisma/client';

export class CreateClaimDto {
  @IsString({ message: 'Claim number is required' })
  claimNumber: string;

  @IsString({ message: 'Description is required' })
  description: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @IsEnum(ClaimStatus, { message: 'Invalid claim status' })
  status: ClaimStatus;

  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  userId: string;

  @IsUUID('4', { message: 'Policy ID must be a valid UUID' })
  policyId: string;
}
