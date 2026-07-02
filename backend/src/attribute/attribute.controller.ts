import {
  Body,
  Param,
  Controller,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto/attribute.dto';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
  @Post()
  create(@Body() dto: AttributeDto) {
    return this.attributeService.create(dto);
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: AttributeDto) {
    return this.attributeService.update(id, dto);
  }
}
