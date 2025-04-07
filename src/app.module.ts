import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

import { InsuranceModule } from './modules/insurance/insurance.module';
import { PolicyModule } from './modules/policy/policy.module';
import { ClaimsModule } from './modules/claims/claims.module';
import { seedInsurance, seedUser } from './utils/seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    InsuranceModule,
    PolicyModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await seedUser(this.prisma);
    await seedInsurance(this.prisma);
    // await seedPolicy(this.prisma);
    // await seedClaim(this.prisma);
  }
}
