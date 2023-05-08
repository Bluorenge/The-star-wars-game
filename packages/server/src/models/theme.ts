import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

interface IUserTheme {
  userId: number;
  theme: string;
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserThemeModel extends Model<IUserTheme> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  theme!: string;
}
