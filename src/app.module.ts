import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env config globally
    DatabaseModule,
  ],
})
export class AppModule {}
