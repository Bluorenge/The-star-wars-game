export interface LoginInput {
  login: string;
  password: string;
}

export class LoginInputDto {
  login: string;
  password: string;

  constructor(info: LoginInput) {
    this.login = info.login.toLocaleLowerCase();
    this.password = info.password;
  }
}

export interface RegisterInput {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export class RegisterInputDto {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;

  constructor(info: RegisterInput) {
    this.first_name = info.firstName;
    this.second_name = info.secondName;
    this.display_name = info.displayName;
    this.login = info.login.toLowerCase();
    this.email = info.email.toLowerCase();
    this.password = info.password;
    this.phone = info.phone;
  }
}

export interface CurrentUserDto {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface CurrentUser {
  id: number;
  firstName: string;
  secondName: string;
  displayName?: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IUserService {
  getCurrentUser(): Promise<CurrentUser>;
}
