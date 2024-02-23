import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsOptional()
  @IsUUID()
  id: string;

  @Field()
  @IsDefined()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;
}
