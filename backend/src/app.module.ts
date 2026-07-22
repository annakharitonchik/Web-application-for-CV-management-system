import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeModule } from './attribute/attribute.module';
import { PrismaModule } from './prisma/prisma.module';
import { PositionModule } from './position/position.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AttributeModule, PositionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
