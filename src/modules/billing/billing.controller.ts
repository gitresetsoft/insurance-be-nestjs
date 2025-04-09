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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Billing')
@ApiBearerAuth()
@Controller('billing')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all billing records with pagination' })
  @ApiQuery({ name: 'productCode', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiResponse({ status: 200, description: 'List of billing records' })
  findAll(
    @Query() pagination: PaginationDto,
    @Query('productCode') productCode?: string,
    @Query('location') location?: string,
  ) {
    return this.billingService.findAll({ productCode, location }, pagination);
  }

  @Post()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Create a new billing record' })
  @ApiResponse({
    status: 201,
    description: 'Billing record created successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto);
  }

  @Put(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Update a billing record' })
  @ApiResponse({
    status: 200,
    description: 'Billing record updated successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  @ApiResponse({ status: 404, description: 'Billing record not found' })
  update(
    @Param('id') id: string,
    @Body() updateData: { location: string; premiumPaid: number },
  ) {
    return this.billingService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete a billing record' })
  @ApiResponse({
    status: 200,
    description: 'Billing record deleted successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  @ApiResponse({ status: 404, description: 'Billing record not found' })
  remove(@Param('id') id: string) {
    return this.billingService.remove(id);
  }
}
