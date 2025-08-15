import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n';

export default function League() {
  const { t } = useLanguage();
  return <PageLayout title={t('pages.league')} />;
}
