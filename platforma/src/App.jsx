import { initializeIcons, Stack } from '@fluentui/react';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import Footer from './components/Footer';

initializeIcons();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <Stack tokens={{ childrenGap: 20 }} styles={{ root: { minHeight: '100vh' } }}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <ImageCarousel />
        <Footer />
      </Stack>
    </FluentProvider>
  );
}

