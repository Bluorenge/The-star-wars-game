import axios from 'axios';

import { CurrentUser } from 'models/auth.model';
import { UserRepository } from 'api/UserService';
import { YANDEX_API_URL } from 'constants/main';

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<CurrentUser> {
    const { data } = await axios.get(`${YANDEX_API_URL}/auth/user`, {
      withCredentials: true,
    });

    return data;
  }
}
