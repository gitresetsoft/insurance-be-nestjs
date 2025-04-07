import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatar: photos[0].value,
      googleId: profile.id,
      accessToken,
    };

    // Check if user exists
    let dbUser = await this.prisma.user.findUnique({
      where: { googleId: profile.id },
    });

    if (!dbUser) {
      // Create new user if doesn't exist
      dbUser = await this.prisma.user.create({
        data: {
          ...user,
          password: await bcrypt.hash(Math.random().toString(36), 10), // Random password for Google users
        },
      });
    } else {
      // Update existing user's profile
      dbUser = await this.prisma.user.update({
        where: { id: dbUser.id },
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          lastLogin: new Date(),
        },
      });
    }

    done(null, dbUser);
  }
}
