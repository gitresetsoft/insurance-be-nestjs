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
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ClaimStatus } from '@prisma/client';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Get()
  async findAll() {
    return await this.claimsService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return await this.claimsService.findByUser(userId);
  }

  @Get('policy/:policyId')
  async findByPolicy(@Param('policyId') policyId: string) {
    return await this.claimsService.findByPolicy(policyId);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: ClaimStatus) {
    return await this.claimsService.findByStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.claimsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClaimDto: CreateClaimDto) {
    return await this.claimsService.create(createClaimDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClaimDto: UpdateClaimDto,
  ) {
    return await this.claimsService.update(id, updateClaimDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.claimsService.remove(id);
  }
}
