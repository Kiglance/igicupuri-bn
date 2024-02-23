import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/query.repository';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from 'src/schema/graphql';
import { UpdateRoleInput } from './dto/update-role.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoleRepository {
  constructor(private readonly queryRepo: QueryRepository) {}

  async createRole(roleInput: CreateRoleInput): Promise<Role> {
    const { name, description } = roleInput;
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
            MERGE (role:Role {name: $name})
            ON CREATE SET role.id = $id,
                role.description = $description
            RETURN role
        `,
        {
          id: uuidv4(),
          name,
          description,
        },
      )
      .run();

    if (query?.length > 0) {
      const {
        role: { properties },
      } = query[0];

      const response = {
        ...properties,
      };

      return response;
    }
  }

  async getRoles(): Promise<Role[]> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
            MATCH (role:Role) RETURN role 
        `,
      )
      .run();

    if (query?.length > 0) {
      const resultArray = [];

      query.forEach((role) => {
        const {
          role: { properties },
        } = role;
        resultArray.push({
          ...properties,
        });
      });

      return resultArray;
    }
  }

  async getRole(id: string): Promise<Role> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
            MATCH (role:Role {id: $id}) RETURN role 
        `,
        {
          id,
        },
      )
      .run();

    if (query?.length > 0) {
      const {
        role: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async getRoleByName(name: string): Promise<Role> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
            MATCH (role:Role {name: $name}) RETURN role 
        `,
        {
          name,
        },
      )
      .run();

    if (query?.length > 0) {
      const {
        role: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async updateRole(id: string, roleInput: UpdateRoleInput): Promise<Role> {
    const { name, description } = roleInput;
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
            MATCH (role:Role {id: $id})
            SET role.name = COALESCE($name, role.name),
                role.desrciption = COALESCE($description, role.description)
            RETURN role
        `,
        {
          id,
          name,
          description,
        },
      )
      .run();

    if (query?.length > 0) {
      const {
        role: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async deleteRole(id: string): Promise<boolean> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
            MATCH (role:Role {id: $id})
            DETACH DELETE role
            RETURN TRUE
        `,
        {
          id,
        },
      )
      .run();

    if (query[0].TRUE === true) {
      return true;
    }
  }
}
