import { Stack, Image, Text } from '@fluentui/react';

export default function Venue({ name, image, address, description, location }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location || address)}&output=embed`;

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { maxWidth: 800, margin: '0 auto' } }}>
      {image && (
        <Image src={image} alt={name} styles={{ root: { width: '100%', height: 'auto' } }} />
      )}
      <Stack tokens={{ childrenGap: 8 }}>
        <Text variant="xxLarge">{name}</Text>
        <Text>{address}</Text>
        <Text>{description}</Text>
      </Stack>
      <iframe
        title={`${name} location`}
        src={mapSrc}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Stack>
  );
}
