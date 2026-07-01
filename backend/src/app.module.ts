import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeModule } from './attribute/attribute.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AttributeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
