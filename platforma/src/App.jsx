import { initializeIcons, Stack } from '@fluentui/react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import Footer from './components/Footer';

initializeIcons();

export default function App() {
  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Navbar />
      <ImageCarousel />
      <Footer />
    </Stack>
  );
}

