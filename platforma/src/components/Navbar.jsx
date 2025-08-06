import { Switch, Toolbar, ToolbarButton } from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const navItems = [
  { key: 'home', text: 'Home', href: '/home' },
  { key: 'article', text: 'Article', href: '/article' },
  { key: 'news', text: 'News', href: '/news' },
  { key: 'game', text: 'Game', href: '/game' },
  { key: 'tournament', text: 'Tournament', href: '/tournament' },
  { key: 'season', text: 'Season', href: '/season' },
  { key: 'league', text: 'League', href: '/league' },
  { key: 'player', text: 'Player', href: '/player' },
  { key: 'players', text: 'Players', href: '/players' },
  { key: 'team', text: 'Team', href: '/team' },
  { key: 'teams', text: 'Teams', href: '/teams' },
  { key: 'venue', text: 'Venue', href: '/venue' },
  { key: 'schedule', text: 'Schedule', href: '/schedule' },
  { key: 'standings', text: 'Standings', href: '/standings' },
  { key: 'bracket', text: 'Bracket', href: '/bracket' },
  { key: 'calendar', text: 'Calendar', href: '/calendar' },
];

export default function Navbar({ isDark, setIsDark }) {
  return (
    <Toolbar style={{ padding: '0 16px', background: 'var(--colorNeutralBackground1)' }}>
      {navItems.map((item) => (
        <ToolbarButton
          key={item.key}
          as={Link}
          to={item.href}
          appearance="subtle"
        >
          {item.text}
        </ToolbarButton>
      ))}
      <div style={{ marginLeft: 'auto' }}>
        <Switch
          checked={isDark}
          label="Dark mode"
          onChange={(_, data) => setIsDark(!!data.checked)}
        />
      </div>
    </Toolbar>
  );
}

