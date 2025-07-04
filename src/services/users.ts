import axios from 'axios';
import { config } from '../config';
import { User } from '../models/user';
import { userAdapter } from '../adapters/user-adapter';

export const get = async ({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<User[]> => {
  const response = await axios.get(`${config.api.base}/auth/users`, {
    params: { page, limit, search },
  });
  if (response?.data?.data) return response.data.data.map(userAdapter);
  throw new Error();
};

export const first = async ({ id }: { id: string }): Promise<User> => {
  const response = await axios.get(`${config.api.base}/auth/users/${id}`);
  if (response?.data?.data) return userAdapter(response.data.data);
  throw new Error();
};

export const users = {
  get,
  first,
};
