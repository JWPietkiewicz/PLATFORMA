import PageLayout from '../components/PageLayout';
import VenueComponent from '../components/Venue';

export default function Venue() {
  return (
    <PageLayout>
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
