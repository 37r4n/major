import { SimpleTemplate } from '../templates/simple-template';
import { assets } from '../assets';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';

export const PageNotFound = () => {
  const translation = useTranslation();
  const navigate = useNavigate();

  return (
    <SimpleTemplate
      title={translation.t('not-found.title')}
      description={translation.t('not-found.description')}
      button={translation.t('not-found.button')}
      onClick={() => navigate(config.pages.home)}
      src={assets.not_found}
    />
  );
};
