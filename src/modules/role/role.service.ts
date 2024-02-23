import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleRepository } from './role.repository';
import { Role } from 'src/schema/graphql';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepo: RoleRepository) {}

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = await this.roleRepo.getRoleByName(createRoleInput.name);
    if (role) {
      throw new HttpException('Role already exists', HttpStatus.CONFLICT);
    }
    return await this.roleRepo.createRole(createRoleInput);
  }

  async getRoles(): Promise<Role[]> {
    const res = await this.roleRepo.getRoles();
    if (!res) {
      throw new HttpException('No role found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async getRole(id: string): Promise<Role> {
    const res = await this.roleRepo.getRole(id);
    if (!res) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async updateRole(
    id: string,
    updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    const res = await this.roleRepo.updateRole(id, updateRoleInput);
    if (!res) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async deleteRole(id: string): Promise<boolean> {
    const role = await this.roleRepo.getRole(id);
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return await this.roleRepo.deleteRole(id);
  }
}
