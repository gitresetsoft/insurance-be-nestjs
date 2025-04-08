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
import { ClaimStatus } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResourceOwnerGuard } from '../../common/guards/resource-owner.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('claims')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createClaimDto: CreateClaimDto, @Request() req) {
    return this.claimsService.create(createClaimDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.admin)
  findAll() {
    return this.claimsService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(ResourceOwnerGuard)
  findUserClaims(@Param('userId') userId: string) {
    return this.claimsService.findByUserId(userId);
  }

  @Get('policy/:policyId')
  @UseGuards(ResourceOwnerGuard)
  findPolicyClaims(@Param('policyId') policyId: string) {
    return this.claimsService.findByPolicy(policyId);
  }

  @Get('status/:status')
  @UseGuards(ResourceOwnerGuard)
  findByStatus(@Param('status') status: ClaimStatus) {
    return this.claimsService.findByStatus(status);
  }

  @Get(':id')
  @UseGuards(ResourceOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.claimsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ResourceOwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateClaimDto: UpdateClaimDto,
    @Request() req,
  ) {
    // Admin can update status, owner can update other fields
    if (req.user.role === UserRole.admin) {
      return this.claimsService.updateStatus(id, {
        status: updateClaimDto.status as ClaimStatus,
      });
    }
    return this.claimsService.update(id, updateClaimDto);
  }

  @Delete(':id')
  @UseGuards(ResourceOwnerGuard)
  remove(@Param('id') id: string) {
    return this.claimsService.remove(id);
  }
}
