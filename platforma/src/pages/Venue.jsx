import PageLayout from '../components/PageLayout';
import VenueComponent from '../components/Venue';
import { useLanguage } from '../i18n';

export default function Venue() {
  const { t } = useLanguage();
  return (
    <PageLayout title={t('pages.venue')}>
      <VenueComponent
        name="Mitch Richmond Arena"
        image="https://placehold.co/800x400"
        address="Kazimierza Górskiego 10, 81-304 Gdynia, Poland"
        description="Boisko nr 2 na kortach Arki"
        location="Kazimierza Górskiego 10, 81-304 Gdynia, Poland"
      />
    </PageLayout>
  );
}
