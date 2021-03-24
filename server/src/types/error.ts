import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class FieldError {
  @Field()
  field?: string;

  @Field()
  message?: string;
}

@ObjectType()
export class ErrorResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
