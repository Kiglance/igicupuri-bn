import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MigrationService } from '../migration.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserSeed {
  constructor(private readonly migrationService: MigrationService) {}

  @Command({
    command: 'seed:role',
    describe: 'seed roles',
  })
  async seeds(): Promise<void> {
    const query: string = `
        CREATE (role1:Role {id: "${uuidv4()}", name: "SuperAdmin", description: "SuperAdmin Role"})
        CREATE (role2:Role {id: "${uuidv4()}", name: "Admin", description: "Admin Role"})
        CREATE (role3:Role {id: "${uuidv4()}", name: "Reviewer", description: "Reviewer Role"})
        CREATE (role4:Role {id: "${uuidv4()}", name: "User", description: "User Role"})
        `;

    try {
      await this.migrationService.runSeeds(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Command({
    command: 'remove:role',
    describe: 'remove roles',
  })
  async remove(): Promise<void> {
    const dataString = `
    MATCH (role:Role) DETACH DELETE role
    `;
    try {
      await this.migrationService.runSeeds(dataString);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  }
}
