import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionDto } from './dto/position.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @Roles(Role.Admin, Role.Recruiter)
  create(@Body() dto: PositionDto) {
    return this.positionService.create(dto);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Recruiter)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: PositionDto) {
    return this.positionService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Recruiter)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.delete(id);
  }

  @Get()
  @Roles(Role.Admin, Role.Recruiter, Role.Candidate)
  getAll() {
    return this.positionService.getAll();
  }
}
