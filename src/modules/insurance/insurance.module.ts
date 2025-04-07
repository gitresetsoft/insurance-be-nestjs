import { Module } from '@nestjs/common';
import { InsuranceProductController } from './insurance-product.controller';
import { InsuranceProductService } from './insurance-product.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InsuranceProductController],
  providers: [InsuranceProductService],
  exports: [InsuranceProductService],
})
export class InsuranceModule {}
