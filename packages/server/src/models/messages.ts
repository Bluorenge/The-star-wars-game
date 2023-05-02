import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import type { Optional } from 'sequelize';

import { ThreadModel } from './threads';

interface IMessage {
  id: number;
  threadId: number;
  nickname: string;
  message: string;
}

type CreationMessage = Optional<IMessage, 'id'>;

@Table({
  tableName: 'messages',
})
export class MessageModel extends Model<IMessage, CreationMessage> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @ForeignKey(() => ThreadModel)
  @Column
  threadId!: number;

  @BelongsTo(() => ThreadModel)
  thread!: ThreadModel;

  @AllowNull(false)
  @Column(DataType.STRING)
  nickname!: string;

  @Column(DataType.STRING)
  message!: string;
}
