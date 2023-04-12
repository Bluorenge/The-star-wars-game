import { CurrentUser } from 'models/auth.model';

export interface UserRepository {
  getCurrent(): Promise<CurrentUser>;
}

export class UserService {
  constructor(private _repo: UserRepository) {}

  getCurrentUser() {
    return this._repo.getCurrent();
  }
}
