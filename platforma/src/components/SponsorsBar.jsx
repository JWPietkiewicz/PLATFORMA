import { useState } from 'react';
import { Stack, IconButton } from '@fluentui/react';

const sponsors = [
  'DOMBI',
  'METALZBYT',
  'TREFL SOPOT',
  'KLIMAZBYT HURTOWNIA BRANŻOWA',
  'USZYTE',
  'KINGUIN ESPORTS LOUNGE',
  'ARKA GDYNIA',
  'HEMPATIA',
  'POLITECHNIKA GDAŃSKA',
  'KOCHAMY AKTYWNOŚĆ',
  'SKLEP KOSZYKARZA',
];

export default function SponsorsBar() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((index - 1 + sponsors.length) % sponsors.length);
  const next = () => setIndex((index + 1) % sponsors.length);

  const sponsor = sponsors[index];
  const imageUrl = `https://placehold.co/160x80?text=${encodeURIComponent(sponsor)}`;

  return (
    <div
      style={{
        padding: 10,
        background: 'var(--colorNeutralBackground1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
        <IconButton iconProps={{ iconName: 'ChevronLeft' }} ariaLabel="Previous sponsor" onClick={prev} />
        <img src={imageUrl} alt={sponsor} style={{ height: 80 }} />
        <IconButton iconProps={{ iconName: 'ChevronRight' }} ariaLabel="Next sponsor" onClick={next} />
      </Stack>
    </div>
  );
}
