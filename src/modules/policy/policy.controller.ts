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
import { PolicyStatus, UserRole } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResourceOwnerGuard } from '../../common/guards/resource-owner.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Policies')
@ApiBearerAuth()
@Controller('policies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new policy' })
  @ApiBody({ type: CreatePolicyDto })
  @ApiResponse({ status: 201, description: 'Policy created successfully' })
  create(@Body() createPolicyDto: CreatePolicyDto, @Request() req) {
    return this.policyService.create({
      ...createPolicyDto,
      userId: req.user.id,
    });
  }

  @Get()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Get all policies (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all policies' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  async findAll() {
    return await this.policyService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Get policies by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of user policies' })
  async findUserPolicies(@Param('userId') userId: string) {
    return await this.policyService.findByUser(userId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get policies by status' })
  @ApiParam({ name: 'status', enum: PolicyStatus })
  @ApiResponse({ status: 200, description: 'List of policies by status' })
  async findByStatus(@Param('status') status: PolicyStatus, @Request() req) {
    if (req.user.role === UserRole.admin) {
      return await this.policyService.findByStatus(status);
    }
    return await this.policyService.findByStatusAndUser(status, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get policy by ID' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @ApiResponse({ status: 200, description: 'Policy details' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  async findOne(@Param('id') id: string) {
    return await this.policyService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwnerGuard)
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Update policy (Admin only)' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @ApiBody({ type: UpdatePolicyDto })
  @ApiResponse({ status: 200, description: 'Policy updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
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
  @ApiOperation({ summary: 'Delete policy (Admin only)' })
  @ApiParam({ name: 'id', description: 'Policy ID' })
  @ApiResponse({ status: 204, description: 'Policy deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access only' })
  @ApiResponse({ status: 404, description: 'Policy not found' })
  async remove(@Param('id') id: string) {
    return await this.policyService.remove(id);
  }
}
