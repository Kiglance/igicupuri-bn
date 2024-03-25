import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/schema/graphql';
import { CreateUserInput } from './dto/create-user.type';
import { UpdateUserInput } from './dto/update-user.types';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(userInput: CreateUserInput): Promise<User> {
    const user = await this.userRepo.getUserByEmail(userInput.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return await this.userRepo.createUser(userInput);
  }

  async getUsers(): Promise<User[]> {
    const res = await this.userRepo.getUsers();
    if (!res) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async getUser(id: string): Promise<User> {
    const res = await this.userRepo.getUser(id);
    if (!res) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async updateUser(id: string, userInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepo.getUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const res = await this.userRepo.updateUser(id, userInput);
    return res;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepo.getUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepo.deleteUser(id);
  }
}
