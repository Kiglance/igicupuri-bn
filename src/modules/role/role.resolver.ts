import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation()
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    try {
      return await this.roleService.createRole(createRoleInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getRoles() {
    try {
      return await this.roleService.getRoles();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getRole(@Args('id') id: string) {
    try {
      return await this.roleService.getRole(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async updateRole(
    @Args('id') id: string,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    try {
      return await this.roleService.updateRole(id, updateRoleInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async deleteRole(@Args('id') id: string) {
    try {
      return await this.roleService.deleteRole(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
