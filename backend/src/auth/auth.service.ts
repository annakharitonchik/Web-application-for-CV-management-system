import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { AuthUserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<AuthUserDto | null> {
    const user = await this.usersService.findOne(username);
    if (user && compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  login(user: AuthUserDto) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
