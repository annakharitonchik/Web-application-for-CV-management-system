import { Body, Controller, Post } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
  @Post('create')
  create(@Body() dto: CreateAttributeDto) {
    return this.attributeService.create(dto);
  }
}
