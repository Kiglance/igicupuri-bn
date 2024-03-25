import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleRepository } from './role.repository';

@Module({
  providers: [RoleResolver, RoleService, RoleRepository],
  exports: [RoleRepository],
})
export class RoleModule {}
