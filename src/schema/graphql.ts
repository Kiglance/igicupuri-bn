
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RoleInput {
    name: string;
    description?: Nullable<string>;
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
}

export class Role {
    id: string;
    name: string;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract getRole(id: string): Role | Promise<Role>;

    abstract getRoles(): Nullable<Role>[] | Promise<Nullable<Role>[]>;

    abstract getUser(id: string): User | Promise<User>;

    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract welcomeMessage(): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class IMutation {
    abstract createRole(createRoleInput: RoleInput): Role | Promise<Role>;

    abstract updateRole(id: string, updateRoleInput: RoleInput): Role | Promise<Role>;

    abstract deleteRole(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createUser(userInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, userInput: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
}

type Nullable<T> = T | null;
