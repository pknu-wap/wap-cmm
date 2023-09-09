import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvConfig } from './config';

import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    PrismaModule,
    // main modules
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
