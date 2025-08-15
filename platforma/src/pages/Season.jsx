import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n';

export default function Season() {
  const { t } = useLanguage();
  return <PageLayout title={t('pages.season')} />;
}
