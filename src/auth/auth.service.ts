// import { Injectable, BadRequestException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async signup(email: string, password: string, name: string) {
//     const existingUser = await this.usersService.findByEmail(email);
//     if (existingUser) throw new BadRequestException('Email already in use');

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await this.usersService.create({
//       email,
//       password: hashedPassword,
//       name,
//     });

//     const payload = { id: user._id, email: user.email };
//     return {
//       user: { id: user._id, email: user.email, name: user.name },
//       token: this.jwtService.sign(payload),
//     };
//   }

//   async validateUser(email: string, password: string) {
//     const user = await this.usersService.findByEmail(email);
//     if (!user) return null;

//     const isPasswordMatching = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatching) return null;

//     return user;
//   }

//   async login(email: string, password: string) {
//     const user = await this.validateUser(email, password);
//     if (!user) throw new BadRequestException('Invalid credentials');

//     const payload = { id: user._id, email: user.email };
//     return {
//       user: { id: user._id, email: user.email, name: user.name },
//       token: this.jwtService.sign(payload),
//     };
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { supabase } from '../supabaseClient';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(name: string, email: string, password: string) {
    try {
      // 1️⃣ Sign up user with Supabase, including name
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }, // <-- ensure name is saved in Supabase user metadata
        },
      });

      if (error) throw new BadRequestException(error.message);
      if (!data.user)
        throw new BadRequestException('Supabase returned no user');

      // 2️⃣ Copy user to MongoDB
      const mongoUser = await this.usersService.copySupabaseUser({
        id: data.user.id,
        email: data.user.email,
        name: name, // <-- ensure name is present
      });

      return { message: 'User created successfully', user: mongoUser };
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Signup failed');
    }
  }
}
