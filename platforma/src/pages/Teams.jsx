import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n';

export default function Teams() {
  const { t } = useLanguage();
  return <PageLayout title={t('pages.teams')} />;
}
