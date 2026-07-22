import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}
