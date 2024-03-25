import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsOptional()
  firstName: string;

  @Field()
  @IsOptional()
  lastName: string;

  @Field()
  @IsOptional()
  @IsEmail()
  email: string;
}
