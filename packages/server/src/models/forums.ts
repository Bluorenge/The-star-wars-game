import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import type { Optional } from 'sequelize';

import { ThreadModel } from './threads';

interface IForum {
  id: number;
  title: string;
  description: string;
}

type CreationForum = Optional<IForum, 'id'>;

@Table({
  tableName: 'forums',
})
export class ForumModel extends Model<IForum, CreationForum> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  description!: string;

  @HasMany(() => ThreadModel)
  threads!: ThreadModel[];
}
