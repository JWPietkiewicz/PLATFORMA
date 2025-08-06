import { CommandBar } from '@fluentui/react';

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

export default function Navbar() {
  return (
    <CommandBar
      items={navItems}
      ariaLabel="Main navigation"
      styles={{ root: { padding: '0 16px', background: '#f3f2f1' } }}
    />
  );
}

