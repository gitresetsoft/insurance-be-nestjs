import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.userId;
    const resourceType = this.getResourceType(request.path);

    // Admin can access all resources
    if (user.role === UserRole.admin) {
      return true;
    }

    if (!resourceId) {
      throw new ForbiddenException('Resource ID not found');
    }

    // Check resource ownership based on type
    switch (resourceType) {
      case 'claims': {
        const claim = await this.prisma.claim.findUnique({
          where: { id: resourceId },
          select: { userId: true },
        });
        if (!claim) {
          throw new NotFoundException('No claims under this user');
        }
        return claim.userId === user.id;
      }

      case 'policies': {
        const policy = await this.prisma.policy.findUnique({
          where: { id: resourceId },
          select: { userId: true },
        });
        if (!policy) {
          throw new NotFoundException('No policies under this user');
        }
        return policy.userId === user.id;
      }

      default:
        throw new ForbiddenException('Resource type not supported');
    }
  }

  private getResourceType(path: string): string | undefined {
    const matches = path.match(/\/(claims|policies)/);
    return matches ? matches[1] : undefined;
  }
}
