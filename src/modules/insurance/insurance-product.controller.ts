import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InsuranceProductService } from './insurance-product.service';
import { CreateInsuranceProductDto } from './dto/create-insurance-product.dto';
import { UpdateInsuranceProductDto } from './dto/update-insurance-product.dto';
import { PolicyType, UserRole } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Insurance Products')
@Controller('insurance-products')
export class InsuranceProductController {
  constructor(
    private readonly insuranceProductService: InsuranceProductService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all insurance products' })
  @ApiResponse({ status: 200, description: 'List of all insurance products' })
  async findAll() {
    return this.insuranceProductService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active insurance products' })
  @ApiResponse({
    status: 200,
    description: 'List of active insurance products',
  })
  async findActive() {
    return this.insuranceProductService.findActiveProducts();
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get insurance products by type' })
  @ApiParam({ name: 'type', enum: PolicyType })
  @ApiResponse({
    status: 200,
    description: 'List of insurance products by type',
  })
  async findByType(@Param('type') type: PolicyType) {
    return this.insuranceProductService.findByType(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get insurance product by ID' })
  @ApiParam({ name: 'id', description: 'Insurance Product ID' })
  @ApiResponse({ status: 200, description: 'Insurance product details' })
  @ApiResponse({ status: 404, description: 'Insurance product not found' })
  async findOne(@Param('id') id: string) {
    return this.insuranceProductService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new insurance product (Admin only)' })
  @ApiBody({ type: CreateInsuranceProductDto })
  @ApiResponse({
    status: 201,
    description: 'Insurance product created successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  async create(@Body() createInsuranceProductDto: CreateInsuranceProductDto) {
    return this.insuranceProductService.create(createInsuranceProductDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an insurance product (Admin only)' })
  @ApiParam({ name: 'id', description: 'Insurance Product ID' })
  @ApiBody({ type: UpdateInsuranceProductDto })
  @ApiResponse({
    status: 200,
    description: 'Insurance product updated successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  @ApiResponse({ status: 404, description: 'Insurance product not found' })
  async update(
    @Param('id') id: string,
    @Body() updateInsuranceProductDto: UpdateInsuranceProductDto,
  ) {
    return this.insuranceProductService.update(id, updateInsuranceProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an insurance product (Admin only)' })
  @ApiParam({ name: 'id', description: 'Insurance Product ID' })
  @ApiResponse({
    status: 204,
    description: 'Insurance product deleted successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  @ApiResponse({ status: 404, description: 'Insurance product not found' })
  async remove(@Param('id') id: string) {
    return this.insuranceProductService.remove(id);
  }
}
