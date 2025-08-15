import { useState } from 'react';
import { IconButton, Image, Stack } from '@fluentui/react';

const images = [
  'https://placehold.co/800x300?text=Sponsor+1',
  'https://placehold.co/800x300?text=Sponsor+2',
  'https://placehold.co/800x300?text=Sponsor+3',
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  return (
    <Stack
      horizontal
      verticalAlign="center"
      tokens={{ childrenGap: 8 }}
      styles={{ root: { maxWidth: 800, margin: '20px auto' } }}
    >
      <IconButton iconProps={{ iconName: 'ChevronLeft' }} ariaLabel="Previous" onClick={prev} />
      <Image src={images[index]} width={800} height={300} alt={`slide ${index + 1}`} />
      <IconButton iconProps={{ iconName: 'ChevronRight' }} ariaLabel="Next" onClick={next} />
    </Stack>
  );
}

