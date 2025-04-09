import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBillingDto {
  @ApiProperty({ description: 'Product code for the billing record' })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({ description: 'Location for the billing record' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Premium amount paid' })
  @IsNumber()
  @IsNotEmpty()
  premiumPaid: number;

  @ApiProperty({ description: 'User ID associated with the billing' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
