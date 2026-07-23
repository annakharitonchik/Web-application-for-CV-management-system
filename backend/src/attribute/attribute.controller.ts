import {
  Body,
  Param,
  Controller,
  Post,
  Put,
  Delete,
  Get,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto/attribute.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin, Role.Recruiter)
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

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.attributeService.delete(id);
  }

  @Get()
  getAll() {
    return this.attributeService.getAll();
  }
}
