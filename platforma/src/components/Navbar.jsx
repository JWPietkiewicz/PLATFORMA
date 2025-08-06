import { Switch, Toolbar, ToolbarButton } from '@fluentui/react-components';

const navItems = [
  { key: 'home', text: 'Home', href: '#' },
  { key: 'news', text: 'News', href: '#' },
  { key: 'calendar', text: 'Calendar', href: '#' },
  { key: 'results', text: 'Results', href: '#' },
  { key: 'schedule', text: 'Schedule', href: '#' },
  { key: 'tables', text: 'Tables', href: '#' },
  { key: 'stats', text: 'Stats', href: '#' },
  { key: 'teams', text: 'Teams', href: '#' },
  { key: 'players', text: 'Players', href: '#' },
];

export default function Navbar({ isDark, setIsDark }) {
  return (
    <Toolbar style={{ padding: '0 16px', background: 'var(--colorNeutralBackground1)' }}>
      {navItems.map((item) => (
        <ToolbarButton
          key={item.key}
          as="a"
          href={item.href}
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

