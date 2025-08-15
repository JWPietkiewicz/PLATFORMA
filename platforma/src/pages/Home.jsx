import ImageCarousel from '../components/ImageCarousel';
import PageLayout from '../components/PageLayout';
import GameCarousel from '../components/GameCarousel';

export default function Home() {
  return (
    <PageLayout title="Home">
      <GameCarousel />
      <ImageCarousel />
    </PageLayout>
  );
}
