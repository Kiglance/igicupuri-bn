import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { PasswordHelper } from 'src/helpers/password.helper';

@Module({
  providers: [UserResolver, UserService, UserRepository, PasswordHelper],
  exports: [UserRepository],
})
export class UserModule {}
