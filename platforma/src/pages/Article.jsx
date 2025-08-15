import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n';

export default function Article() {
  const { t } = useLanguage();
  return <PageLayout title={t('pages.article')} />;
}
