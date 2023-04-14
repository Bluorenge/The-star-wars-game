import { CurrentUser } from 'models/auth.model';
import { UserRepository } from '../api/UserService';
import axios from 'axios';
import { isServer } from 'helpers/window';

const API_ROOT =
  isServer || window.location.port === '3001'
    ? 'http://localhost:3001/api/v2' // чтобы запросы шли через мидлвару на нашем сервере
    : 'https://ya-praktikum.tech/api/v2';

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<CurrentUser> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      withCredentials: true,
    });

    return data;
  }
}
