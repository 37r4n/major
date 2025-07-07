import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/auth';
import { ListTemplate } from '../templates/list-template';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

export const HomePage = () => {
  const auth = useAuth();
  const translation = useTranslation();
  const navigate = useNavigate();

  return (
    <ListTemplate
      navbar={{
        user: auth.me,

        links: [
          {
            title: translation.t('courses.lessons.navbar.home'),
            onClick: () => navigate(config.pages.user.home),
          },

          {
            title: translation.t('courses.lessons.navbar.courses'),
            onClick: () => navigate(config.pages.user.courses),
          },
        ],
      }}
    />
  );
};
