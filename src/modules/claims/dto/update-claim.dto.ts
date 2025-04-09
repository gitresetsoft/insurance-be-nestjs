import {
  IsString,
  IsNumber,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ClaimStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClaimDto {
  @IsString({ message: 'Claim number must be a string' })
  @IsOptional()
  claimNumber?: string;

  @ApiProperty({
    description: 'Updated description of the claim',
    example: 'Updated: Car accident damage to front and side bumper',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Updated claim amount',
    example: 2000.75,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    description: 'Updated claim status',
    enum: ClaimStatus,
    example: ClaimStatus.UNDER_REVIEW,
    required: false,
  })
  @IsOptional()
  @IsEnum(ClaimStatus)
  status?: ClaimStatus;

  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsOptional()
  userId?: string;

  @IsUUID('4', { message: 'Policy ID must be a valid UUID' })
  @IsOptional()
  policyId?: string;
}
