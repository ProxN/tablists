import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import List, { ListType } from './List.entity';
import * as listErrors from './errors';
import { checkEmpty, inEnum } from '../../utils/helpersFunc';
import { ErrorResponse } from '../../types/error';
import { Context } from '../../types/context';
import { getConnection } from 'typeorm';

@InputType()
class ListInputs {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  image!: string;

  @Field()
  type!: ListType;
}

@InputType()
class EditListInputs implements Partial<List> {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  type?: ListType;
}

@ObjectType()
class ListResponse extends ErrorResponse {
  @Field(() => List, { nullable: true })
  list?: List;
}

@ObjectType()
class DeleteListResponse extends ErrorResponse {
  @Field({ defaultValue: false })
  deleted?: boolean;
}

@Resolver()
class ListResolver {
  @Authorized()
  @Mutation(() => ListResponse)
  async createList(
    @Arg('data') data: ListInputs,
    @Ctx() { req }: Context
  ): Promise<ListResponse> {
    const error = checkEmpty(data);

    if (error.message) {
      return { error };
    }

    const checkType = inEnum(ListType, data.type);
    if (!checkType) {
      return { error: listErrors.typeError };
    }

    const list = await List.create({
      ...data,
      userId: req.session.userId,
    }).save();

    return { list };
  }

  @Authorized()
  @Mutation(() => ListResponse)
  async editList(
    @Arg('listId') listId: string,
    @Arg('data') newList: EditListInputs,
    @Ctx() { req }: Context
  ) {
    const error = checkEmpty(newList);

    if (error.message) {
      return { error };
    }

    if (newList.type) {
      const checkType = inEnum(ListType, newList.type);
      if (!checkType) {
        return { error: listErrors.typeError };
      }
    }

    const list = await getConnection()
      .createQueryBuilder()
      .update(List)
      .set(newList)
      .where('id = :listId and userId =:userId', { listId, userId: req.session.userId })
      .returning('*')
      .execute();

    if (list.affected === 0) {
      return { error: listErrors.editListPermission };
    }

    return { list: list.raw[0] };
  }

  @Authorized()
  @Mutation(() => DeleteListResponse)
  async deleteList(
    @Arg('listId') listId: string,
    @Ctx() { req }: Context
  ): Promise<DeleteListResponse> {
    const list = await List.findOne({
      where: { id: listId, userId: req.session.userId },
    });

    if (!list) {
      return {
        error: listErrors.deleteListPermission,
      };
    }

    if (list.published) {
      return {
        error: listErrors.alreadyPublished,
      };
    }

    await List.delete(listId);

    return { deleted: true };
  }

  @Query(() => ListResponse)
  async getList(@Arg('listId') listId: string) {
    const list = await List.findOne(listId);

    if (!list) {
      return { error: listErrors.listNotExists };
    }

    return { list };
  }

  @Authorized()
  @Query(() => [List])
  async getUserLists(
    @Arg('published') published: boolean,
    @Ctx() { req }: Context
  ): Promise<List[]> {
    const lists = await List.find({ where: { userId: req.session.userId, published } });
    return lists;
  }
}

export default ListResolver;
