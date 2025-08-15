import { useEffect, useState } from 'react';
import { Stack } from '@fluentui/react';
import './SponsorsBar.css';
import sponsors from '../data/sponsors';

export default function SponsorsBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % sponsors.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: 6 }, (_, i) => {
    const sponsor = sponsors[(index + i) % sponsors.length];
    const imageUrl = `https://placehold.co/160x80?text=${encodeURIComponent(sponsor)}`;
    return <img key={sponsor} src={imageUrl} alt={sponsor} style={{ height: 80 }} />;
  });

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
      <Stack
        key={index}
        className="sponsor-fade"
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 8 }}
      >
        {visible}
      </Stack>
    </div>
  );
}
