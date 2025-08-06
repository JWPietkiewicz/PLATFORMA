import { CommandBar } from '@fluentui/react';
import { Switch } from '@fluentui/react-components';

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
  const farItems = [
    {
      key: 'themeToggle',
      onRender: () => (
        <Switch
          checked={isDark}
          label="Dark mode"
          onChange={(_, data) => setIsDark(!!data.checked)}
        />
      ),
    },
  ];

  return (
    <CommandBar
      items={navItems}
      farItems={farItems}
      ariaLabel="Main navigation"
      styles={{ root: { padding: '0 16px', background: 'var(--colorNeutralBackground1)' } }}
    />
  );
}

