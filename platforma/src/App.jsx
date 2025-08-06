import { initializeIcons, Stack } from '@fluentui/react';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import Footer from './components/Footer';
import ArticleExample from './components/ArticleExample';

initializeIcons();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <Stack tokens={{ childrenGap: 20 }}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <ImageCarousel />
        <ArticleExample />
        <Footer />
      </Stack>
    </FluentProvider>
  );
}

