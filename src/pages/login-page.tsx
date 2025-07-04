import { useState } from 'react';
import { LoginTemplate } from '../templates/login-template';
import { useTranslation } from 'react-i18next';
import { assets } from '../assets';
import { services } from '../services';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const translation = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    const response = await services.auth.login({ username });

    if (response) {
      for (const role of response.roles) {
        if (role.name == 'admin_major') {
          navigate('/admin/courses');
        }
      }

      //navigate('/courses');
    }
  };

  return (
    <LoginTemplate
      title={translation.t('login.title')}
      subtitle={translation.t('login.subtitle')}
      button={translation.t('login.button')}
      src={assets.login}
      onSubmit={() => handleSubmit()}
      fields={{
        username: {
          placeholder: translation.t('login.fields.username.placeholder'),
          value: username,
          onChange: (e) => setUsername(e.target.value),
        },
      }}
    />
  );
};
