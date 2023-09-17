import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthConfig, EnvConfig, JwtConfig } from './config';
import { AuthModule, EventsModule, UsersModule } from './modules';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig, AuthConfig, JwtConfig],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    PrismaModule,
    // main modules
    AuthModule,
    UsersModule,
    EventsModule,
  ],
})
export class AppModule {
  static PORT: number;
  static API_PREFIX: string;
  static FRONTEND_URL: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.PORT = this.configService.get<number>('PORT');
    AppModule.API_PREFIX = this.configService.get<string>('API_PREFIX');
    AppModule.FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
  }
}
