import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [AttributeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
