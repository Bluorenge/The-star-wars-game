import axios from 'axios'

class Auth {
  login(payload: any) {
    return axios.put('auth', payload);
  }
}

export const auth = new Auth();
