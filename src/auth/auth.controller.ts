// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('signup')
//   signup(
//     @Body('email') email: string,
//     @Body('password') password: string,
//     @Body('username') username: string,
//   ) {
//     return this.authService.signup(email, password, username);
//   }

//   @Post('login')
//   login(@Body('email') email: string, @Body('password') password: string) {
//     return this.authService.login(email, password);
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signUp(name, email, password); // ✅ match method name in AuthService
  }

  // @Post('login')
  // async login(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ) {
  //   return this.authService.login(email, password); // Make sure login exists in AuthService
  // }
}
