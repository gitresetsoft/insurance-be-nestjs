import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  premiumPaid: number;
}
