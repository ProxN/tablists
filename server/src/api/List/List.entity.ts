import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '../User/User.entity';

export enum ListType {
  MOVIES = 'movies',
  BOOKS = 'books',
  TRAVEL = 'travel',
  ANIME = 'animes',
  OTHER = 'other',
}

@ObjectType()
@Entity()
class List extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ListType,
    default: ListType.MOVIES,
  })
  type!: ListType;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column({ default: false })
  published?: boolean;

  @Field()
  @Column({ default: 0 })
  views?: number;

  @Field()
  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.lists)
  user!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}

export default List;
