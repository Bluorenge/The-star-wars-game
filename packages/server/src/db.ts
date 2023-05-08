import { Sequelize } from 'sequelize-typescript';

import { MessageModel } from './models/messages';
import { ThreadModel } from './models/threads';
import { ForumModel } from './models/forums';
import { UserThemeModel } from './models/theme';
import { config } from './config';

const { host, port, user, password, database } = config.database;

export const sequelize = new Sequelize({
  host,
  port,
  username: user,
  password,
  database,
  dialect: 'postgres',
  models: [MessageModel, ThreadModel, ForumModel, UserThemeModel],
});

// Подключение к БД
export const dbConnect = async () => {
  try {
    await sequelize.authenticate(); // Проверка коннекта к бд
    await sequelize.sync(); // Синхронизация БД

    console.log('Sequelize connecnted');
  } catch (error) {
    console.error('Sequelize unable to connect:', error);
  }
};
