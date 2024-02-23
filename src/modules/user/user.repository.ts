import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/query.repository';
import { User } from 'src/schema/graphql';
import { PasswordHelper } from 'src/helpers/password.helper';
import { CreateUserInput } from './dto/create-user.type';
import { UpdateUserInput } from './dto/update-user.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(
    private readonly queryRepo: QueryRepository,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async createUser(userInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, email, password } = userInput;
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
          MERGE (user:User {email: $email})
          ON CREATE SET user.id = $id,
            user.firstName = $firstName,
            user.lastName = $lastName,
            user.password = $password,
            user.isVerified = false
          RETURN user                       
        `,
        {
          id: uuidv4(),
          firstName,
          lastName,
          email,
          password: await this.passwordHelper.hashPassword(password),
        },
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async getUsers(): Promise<User[]> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User) RETURN user 
      `,
      )
      .run();

    if (query?.length > 0) {
      const resultArray = [];

      query.forEach((user) => {
        const {
          user: { properties },
        } = user;
        resultArray.push({
          ...properties,
        });
      });

      return resultArray;
    }
  }

  async getUser(id: string): Promise<User> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {id: $id}) RETURN user
        `,
        { id },
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {email: $email}) RETURN user
      `,
        { email },
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async updateUser(id: string, userInput: UpdateUserInput): Promise<User> {
    const { firstName, lastName, email } = userInput;
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {id: $id})
        SET user.firstName = COALESCE($firstName, user.firstName),
            user.lastName = COALESCE($lastName, user.lastName),
            user.email = COALESCE($email, user.email)
        RETURN user
      `,
        {
          id,
          firstName,
          lastName,
          email,
        },
      )
      .run();

    if (query?.length > 0) {
      const {
        user: { properties },
      } = query[0];

      return {
        ...properties,
      };
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const query = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {id: $id})
        DETACH DELETE user
        RETURN TRUE
      `,
        { id },
      )
      .run();

    if (query[0].TRUE === true) {
      return true;
    }
  }
}
