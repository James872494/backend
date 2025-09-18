import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Route to copy Supabase user to MongoDB
  @Post('copy-supabase')
  async copySupabaseUser(@Body() body: { supabaseUser: any }) {
    const user = await this.usersService.copySupabaseUser(body.supabaseUser);
    return { message: 'User caopied to MongoDB', user };
  }

  // ✅ New route to fetch all users
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
