import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/schema/graphql';
import { UserService } from './user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.type';
import { UpdateUserInput } from './dto/update-user.types';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation()
  async createUser(
    @Args('userInput') userInput: CreateUserInput,
  ): Promise<User> {
    try {
      return await this.userService.createUser(userInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getUser(@Args('id') id: string): Promise<User> {
    try {
      return await this.userService.getUser(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async updateUser(
    @Args('id') id: string,
    @Args('userInput') userInput: UpdateUserInput,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, userInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
