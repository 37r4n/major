import axios from 'axios';
import Cookies from 'js-cookie';
import { config } from '../config';
import { User } from '../models/user';
import { userAdapter } from '../adapters/user-adapter';

const login = async ({ username }: { username: string }): Promise<User> => {
  const response = await axios.post(`${config.api.base}/auth/login`, {
    username,
  });

  if (response?.data?.data) {
    const { access_token, refresh_token } = response.data.data;
    Cookies.set('access_token', access_token);
    Cookies.set('refresh_token', refresh_token);
    return userAdapter(response.data.data.user);
  }

  throw new Error();
};

const me = async (): Promise<User> => {
  const response = await axios.post(`${config.api.base}/auth/me`);
  if (response?.data) return userAdapter(response.data.data);
  throw new Error();
};

export const auth = {
  me,
  login,
};
