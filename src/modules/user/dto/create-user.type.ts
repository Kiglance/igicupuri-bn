import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  id: string;

  @Field()
  @IsDefined()
  firstName: string;

  @Field()
  @IsDefined()
  lastName: string;

  @Field()
  @IsDefined()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  password: string;
}
