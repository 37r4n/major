import { User } from '../models/user';

export const userAdapter = (data: any): User => ({
  id: data.id,
  name: data.name,
  code: data.code,
  is_active: data.is_active,
  avatar_url: data.avatar_url,
  roles: Array.isArray(data.roles) ? data.roles : [],
});
