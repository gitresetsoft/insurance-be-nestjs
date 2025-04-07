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
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PolicyStatus } from '@prisma/client';

@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  async findAll() {
    return await this.policyService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return await this.policyService.findByUser(userId);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: PolicyStatus) {
    return await this.policyService.findByStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.policyService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPolicyDto: CreatePolicyDto) {
    return await this.policyService.create(createPolicyDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePolicyDto: UpdatePolicyDto,
  ) {
    return await this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.policyService.remove(id);
  }
}
