import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionDto } from './dto/position.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';

@Roles(Role.Admin)
@Roles(Role.Recruiter)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() dto: PositionDto) {
    return this.positionService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: PositionDto) {
    return this.positionService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.delete(id);
  }

  @Get()
  getAll() {
    return this.positionService.getAll();
  }
}
