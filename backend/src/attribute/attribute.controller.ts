import { Body, Controller, Post } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto/attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
  @Post('create')
  create(@Body() dto: AttributeDto) {
    return this.attributeService.create(dto);
  }
}
