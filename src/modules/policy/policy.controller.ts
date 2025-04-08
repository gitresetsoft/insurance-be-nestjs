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
  Request,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PolicyStatus } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResourceOwnerGuard } from '../../common/guards/resource-owner.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('policies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPolicyDto: CreatePolicyDto, @Request() req) {
    return this.policyService.create({
      ...createPolicyDto,
      userId: req.user.id,
    });
  }

  @Get()
  @Roles(UserRole.admin)
  async findAll() {
    return await this.policyService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(ResourceOwnerGuard)
  async findUserPolicies(@Param('userId') userId: string) {
    return await this.policyService.findByUser(userId);
  }

  @Get('status/:status')
  @UseGuards(ResourceOwnerGuard)
  async findByStatus(@Param('status') status: PolicyStatus, @Request() req) {
    if (req.user.role === UserRole.admin) {
      return await this.policyService.findByStatus(status);
    }
    return await this.policyService.findByStatusAndUser(status, req.user.id);
  }

  @Get(':id')
  @UseGuards(ResourceOwnerGuard)
  async findOne(@Param('id') id: string) {
    return await this.policyService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwnerGuard)
  @Roles(UserRole.admin)
  async update(
    @Param('id') id: string,
    @Body() updatePolicyDto: UpdatePolicyDto,
  ) {
    return await this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  @UseGuards(ResourceOwnerGuard)
  @Roles(UserRole.admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.policyService.remove(id);
  }
}
