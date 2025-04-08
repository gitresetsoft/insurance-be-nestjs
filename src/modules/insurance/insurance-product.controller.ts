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
import { PolicyType } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('insurance-products')
export class InsuranceProductController {
  constructor(
    private readonly insuranceProductService: InsuranceProductService,
  ) {}

  @Get()
  async findAll() {
    return this.insuranceProductService.findAll();
  }

  @Get('active')
  async findActive() {
    return this.insuranceProductService.findActiveProducts();
  }

  @Get('type/:type')
  async findByType(@Param('type') type: PolicyType) {
    return this.insuranceProductService.findByType(type);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.insuranceProductService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInsuranceProductDto: CreateInsuranceProductDto) {
    return this.insuranceProductService.create(createInsuranceProductDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.admin)
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
  async remove(@Param('id') id: string) {
    return this.insuranceProductService.remove(id);
  }
}
