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
} from '@nestjs/common';
import { InsuranceProductService } from './insurance-product.service';
import { CreateInsuranceProductDto } from './dto/create-insurance-product.dto';
import { UpdateInsuranceProductDto } from './dto/update-insurance-product.dto';
import { PolicyType } from '@prisma/client';

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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInsuranceProductDto: CreateInsuranceProductDto) {
    return this.insuranceProductService.create(createInsuranceProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInsuranceProductDto: UpdateInsuranceProductDto,
  ) {
    return this.insuranceProductService.update(id, updateInsuranceProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.insuranceProductService.remove(id);
  }
}
