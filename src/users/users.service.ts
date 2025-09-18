import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Copy Supabase user to MongoDB
  async copySupabaseUser(supabaseUser: any) {
    if (!supabaseUser?.id || !supabaseUser?.email) {
      throw new BadRequestException('Invalid Supabase user');
    }

    // Check if user already exists in MongoDB
    const existing = await this.userModel.findOne({
      supabaseId: supabaseUser.id,
    });
    if (existing) return existing;

    const mongoUser = new this.userModel({
      supabaseId: supabaseUser.id,
      email: supabaseUser.email,
      name: supabaseUser.user_metadata?.name || supabaseUser.name || 'Unknown',
      createdAt: new Date(),
    });

    await mongoUser.save();
    return mongoUser;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}
