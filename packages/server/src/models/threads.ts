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
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import type { Optional } from 'sequelize';

import { MessageModel } from './messages';
import { ForumModel } from './forums';

interface IThread {
  id: number;
  forumId: number;
  name: string;
  description: string;
}

type CreationThread = Optional<IThread, 'id'>;

@Table({
  tableName: 'threads',
})
export class ThreadModel extends Model<IThread, CreationThread> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @ForeignKey(() => ForumModel)
  @Column
  forumId!: number;

  @BelongsTo(() => ForumModel)
  forum!: ForumModel;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  description!: string;

  @HasMany(() => MessageModel)
  messages!: MessageModel[];
}
