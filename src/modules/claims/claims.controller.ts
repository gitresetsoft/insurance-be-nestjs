import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ClaimStatus, UserRole } from '@prisma/client';
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

@ApiTags('Claims')
@ApiBearerAuth()
@Controller('claims')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new claim' })
  @ApiBody({ type: CreateClaimDto })
  @ApiResponse({
    status: 201,
    description: 'Claim created successfully',
  })
  create(@Body() createClaimDto: CreateClaimDto, @Request() req) {
    return this.claimsService.create(createClaimDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Get all claims (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all claims',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Admin access only',
  })
  findAll() {
    return this.claimsService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Get claims by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of user claims',
  })
  findUserClaims(@Param('userId') userId: string) {
    return this.claimsService.findByUserId(userId);
  }

  @Get('policy/:policyId')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Get claims by policy ID' })
  @ApiParam({ name: 'policyId', description: 'Policy ID' })
  @ApiResponse({
    status: 200,
    description: 'List of policy claims',
  })
  findPolicyClaims(@Param('policyId') policyId: string) {
    return this.claimsService.findByPolicy(policyId);
  }

  @Get('status/:status')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Get claims by status' })
  @ApiParam({ name: 'status', enum: ClaimStatus })
  @ApiResponse({
    status: 200,
    description: 'List of claims by status',
  })
  findByStatus(@Param('status') status: ClaimStatus) {
    return this.claimsService.findByStatus(status);
  }

  @Get(':id')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Get claim by ID' })
  @ApiParam({ name: 'id', description: 'Claim ID' })
  @ApiResponse({
    status: 200,
    description: 'Claim details',
  })
  @ApiResponse({
    status: 404,
    description: 'Claim not found',
  })
  findOne(@Param('id') id: string) {
    return this.claimsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Update claim' })
  @ApiParam({ name: 'id', description: 'Claim ID' })
  @ApiBody({ type: UpdateClaimDto })
  @ApiResponse({
    status: 200,
    description: 'Claim updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiResponse({
    status: 404,
    description: 'Claim not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateClaimDto: UpdateClaimDto,
    @Request() req,
  ) {
    if (req.user.role === UserRole.admin) {
      return this.claimsService.updateStatus(id, {
        status: updateClaimDto.status as ClaimStatus,
      });
    }
    return this.claimsService.update(id, updateClaimDto);
  }

  @Delete(':id')
  @UseGuards(ResourceOwnerGuard)
  @ApiOperation({ summary: 'Delete claim' })
  @ApiParam({ name: 'id', description: 'Claim ID' })
  @ApiResponse({
    status: 200,
    description: 'Claim deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiResponse({
    status: 404,
    description: 'Claim not found',
  })
  remove(@Param('id') id: string) {
    return this.claimsService.remove(id);
  }
}
