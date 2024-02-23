import { Module, forwardRef } from '@nestjs/common';
import { UserSeed } from './seeds/role.seed';
import { CommandModule } from 'nestjs-command';
import { Neo4jModule } from '../neo4j.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from 'src/modules/role/role.module';
import { MigrationService } from './migration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    Neo4jModule.forRootAsync(),
    CommandModule,
    RoleModule,
  ],
  providers: [MigrationService, UserSeed],
})
export class MigrationModule {}
