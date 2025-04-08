import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id;
    const resourceType = this.getResourceType(request.path);

    // Admin can access all resources
    if (user.role === UserRole.admin) {
      return true;
    }

    // Check resource ownership based on type
    switch (resourceType) {
      case 'claims': {
        const claim = await this.prisma.claim.findUnique({
          where: { id: resourceId },
          select: { userId: true },
        });
        return claim?.userId === user.id;
      }

      case 'policies': {
        const policy = await this.prisma.policy.findUnique({
          where: { id: resourceId },
          select: { userId: true },
        });
        return policy?.userId === user.id;
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
