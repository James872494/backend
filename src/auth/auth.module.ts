// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { UsersModule } from '../users/users.module'; // ✅ Import UsersModule

// @Module({
//   imports: [
//     UsersModule, // ✅ Add this
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || 'secret',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
