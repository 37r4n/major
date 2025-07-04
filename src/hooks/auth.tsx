import { useEffect, useState } from 'react';
import { User } from './../models/user';
import { services } from '../services';
import { useNavigate } from 'react-router-dom';

const emptyUser: User = {
  id: '',
  code: '',
  name: '',
  is_active: false,
  avatar_url: null,
  roles: [],
};

export const useAuth = ({ allowed_roles = [] }: { allowed_roles?: string[] } = {}) => {
  const navigate = useNavigate();

  const [me, setMe] = useState<User>(() => {
    const stored = localStorage.getItem('me');
    return stored ? JSON.parse(stored) : emptyUser;
  });

  const validate = async () => {
    const response = await services.auth.me();
    const is_authorized =
      allowed_roles.length === 0 || response.roles.some((role) => allowed_roles.includes(role.name));
    if (!is_authorized) navigate('/login');
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
