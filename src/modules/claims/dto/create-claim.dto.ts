import { IsString, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { ClaimStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClaimDto {
  @ApiProperty({
    description: 'Unique claim number',
    example: 'CLM-2024-001',
  })
  @IsString({ message: 'Claim number is required' })
  claimNumber: string;

  @ApiProperty({
    description: 'Detailed description of the claim',
    example: 'Car accident damage to front bumper',
  })
  @IsString({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    description: 'Claim amount in the base currency',
    example: 1500.50,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @ApiProperty({
    description: 'Current status of the claim',
    enum: ClaimStatus,
    example: ClaimStatus.SUBMITTED,
  })
  @IsEnum(ClaimStatus, { message: 'Invalid claim status' })
  status: ClaimStatus;

  @ApiProperty({
    description: 'ID of the user filing the claim',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  userId: string;

  @ApiProperty({
    description: 'ID of the policy associated with the claim',
    example: '987fcdeb-51a2-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'Policy ID must be a valid UUID' })
  policyId: string;
}
