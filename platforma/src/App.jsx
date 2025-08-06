import { initializeIcons, Stack } from '@fluentui/react';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Article from './pages/Article';
import News from './pages/News';
import Game from './pages/Game';
import Tournament from './pages/Tournament';
import Season from './pages/Season';
import League from './pages/League';
import Player from './pages/Player';
import Players from './pages/Players';
import Team from './pages/Team';
import Teams from './pages/Teams';
import Venue from './pages/Venue';
import Schedule from './pages/Schedule';
import Standings from './pages/Standings';
import Bracket from './pages/Bracket';
import Calendar from './pages/Calendar';

initializeIcons();

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <Stack tokens={{ childrenGap: 20 }}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/news" element={<News />} />
          <Route path="/game" element={<Game />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/season" element={<Season />} />
          <Route path="/league" element={<League />} />
          <Route path="/player" element={<Player />} />
          <Route path="/players" element={<Players />} />
          <Route path="/team" element={<Team />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/bracket" element={<Bracket />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </Stack>
    </FluentProvider>
  );
}

