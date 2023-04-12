import { CurrentUser } from 'models/auth.model';
import { UserRepository } from '../api/UserService';
import axios from 'axios';

const REDIRECT_URI = 'https://ya-praktikum.tech';
const API_ROOT = `${REDIRECT_URI}/api/v2`;

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<CurrentUser> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      withCredentials: true,
    });

    return data;
  }
}
