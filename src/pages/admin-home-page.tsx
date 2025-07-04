import { ListTemplate } from '../templates/list-template';
import { useAuth } from '../hooks/auth';
import { config } from '../config';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const AdminHomePage = ({ pathname }: { pathname: string }) => {
  const auth = useAuth({ allowed_roles: [config.roles.admin] });
  const translation = useTranslation();
  const navigate = useNavigate();

  return (
    <ListTemplate
      navbar={{
        user: auth.me,

        links: [
          {
            title: translation.t('admin.courses.navbar.home'),
            onClick: () => navigate(pathname),
            is_active: true,
          },

          {
            title: translation.t('admin.courses.navbar.courses'),
            onClick: () => navigate(config.pages.admin.courses),
          },

          {
            title: translation.t('admin.courses.navbar.enrollments'),
            onClick: () => navigate(config.pages.admin.home),
          },
        ],
      }}
    />
  );
};
