import { Switch, Toolbar, ToolbarButton } from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const navItems = [
  { key: 'home', text: 'Home', to: '/' },
  { key: 'article', text: 'Article', to: '/article' },
  { key: 'news', text: 'News', to: '/news' },
  { key: 'game', text: 'Game', to: '/game' },
  { key: 'tournament', text: 'Tournament', to: '/tournament' },
  { key: 'season', text: 'Season', to: '/season' },
  { key: 'league', text: 'League', to: '/league' },
  { key: 'player', text: 'Player', to: '/player' },
  { key: 'players', text: 'Players', to: '/players' },
  { key: 'team', text: 'Team', to: '/team' },
  { key: 'teams', text: 'Teams', to: '/teams' },
  { key: 'venue', text: 'Venue', to: '/venue' },
  { key: 'schedule', text: 'Schedule', to: '/schedule' },
  { key: 'standings', text: 'Standings', to: '/standings' },
  { key: 'bracket', text: 'Bracket', to: '/bracket' },
  { key: 'calendar', text: 'Calendar', to: '/calendar' },
  { key: 'sponsors', text: 'Sponsors', to: '/sponsors' },
];

export default function Navbar({ isDark, setIsDark }) {
  return (
    <Toolbar style={{ padding: '0 16px', background: 'var(--colorNeutralBackground1)' }}>
      {navItems.map((item) => (
        <Link key={item.key} to={item.to} style={{ textDecoration: 'none' }}>
          <ToolbarButton appearance="subtle">{item.text}</ToolbarButton>
        </Link>
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

