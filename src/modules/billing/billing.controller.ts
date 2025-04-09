import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { PaginationDto } from '../../common/helpers/pagination.helper';

@Controller('billing')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query('productCode') productCode?: string,
    @Query('location') location?: string,
  ) {
    return this.billingService.findAll({ productCode, location }, pagination);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @Put(':productCode')
  @Roles(UserRole.admin)
  update(
    @Param('id') id: string,
    @Param('productCode') productCode: string,
    @Body() updateData: { location: string; premiumPaid: number },
  ) {
    return this.billingService.update(id, productCode, updateData);
  }

  @Delete(':productCode')
  @Roles(UserRole.admin)
  remove(@Param('id') id: string, @Param('productCode') productCode: string) {
    return this.billingService.remove(id, productCode);
  }
}
