import { Field, ID, ObjectType } from 'type-graphql';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import List from '../List/List.entity';

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  avatar?: string | null;

  @Field()
  @Column({ default: false })
  isPrivate?: boolean;

  @Field()
  @Column({ default: false })
  isDeleted?: boolean;

  @OneToMany(() => List, (list) => list.user)
  lists!: List[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(hashPass: string, password: string) {
    return await bcrypt.compare(password, hashPass);
  }

  generateResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    return { resetToken, hashedToken };
  }
}

export default User;
