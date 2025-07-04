import { useEffect, useState } from 'react';
import { User } from './../models/user';
import { services } from '../services';

export const useAuth = () => {
  const [me, setMe] = useState<User>({
    id: '',
    code: '',
    name: '',
    is_active: false,
    avatar_url: null,
    roles: [],
  });
  const validate = async () => {
    const response = await services.auth.me();
    setMe(response);
  };

  useEffect(() => {
    validate();
  }, []);

  return {
    me,
    validate,
  };
};
