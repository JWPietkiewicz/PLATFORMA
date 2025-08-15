import {
  Switch,
  Toolbar,
  ToolbarButton,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

const navItems = [
  { key: 'home', to: '/' },
  { key: 'article', to: '/article' },
  { key: 'news', to: '/news' },
  { key: 'game', to: '/game' },
  { key: 'tournament', to: '/tournament' },
  { key: 'season', to: '/season' },
  { key: 'league', to: '/league' },
  { key: 'player', to: '/player' },
  { key: 'players', to: '/players' },
  { key: 'team', to: '/team' },
  { key: 'teams', to: '/teams' },
  { key: 'venue', to: '/venue' },
  { key: 'schedule', to: '/schedule' },
  { key: 'standings', to: '/standings' },
  { key: 'bracket', to: '/bracket' },
  { key: 'calendar', to: '/calendar' },
];

export default function Navbar({ isDark, setIsDark }) {
  const { t, language, setLanguage } = useLanguage();
  return (
    <Toolbar style={{ padding: '0 16px', background: 'var(--colorNeutralBackground1)' }}>
      {navItems.map((item) => (
        <Link key={item.key} to={item.to} style={{ textDecoration: 'none' }}>
          <ToolbarButton appearance="subtle">
            {t(`navbar.${item.key}`)}
          </ToolbarButton>
        </Link>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Dropdown
          value={language}
          onOptionSelect={(_, data) => setLanguage(data.optionValue)}
          style={{ minWidth: 80 }}
        >
          <Option value="en">EN</Option>
          <Option value="es">ES</Option>
        </Dropdown>
        <Switch
          checked={isDark}
          label={t('navbar.darkMode')}
          onChange={(_, data) => setIsDark(!!data.checked)}
        />
      </div>
    </Toolbar>
  );
}

