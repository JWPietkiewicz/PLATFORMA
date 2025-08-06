import { Stack, Image } from '@fluentui/react';
import { Text, tokens } from '@fluentui/react-components';

export default function Venue({ name, image, address, description, location }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location || address)}&output=embed`;

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { maxWidth: 800, margin: '0 auto' } }}>
      <Text as="h1" size={800} block style={{ color: 'var(--colorNeutralForeground1)' }}>
        {name}
      </Text>
      {image && (
        <Image
          src={image}
          alt={name}
          styles={{ root: { width: '100%', height: 'auto', boxShadow: tokens.shadow4 } }}
        />
      )}
      {description && (
        <Text style={{ color: 'var(--colorNeutralForeground1)' }}>{description}</Text>
      )}
      <iframe
        title={`${name} location`}
        src={mapSrc}
        width="100%"
        height="300"
        style={{ border: 0, boxShadow: tokens.shadow4 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {location && (
        <Text style={{ color: 'var(--colorNeutralForeground1)' }}>{location}</Text>
      )}
    </Stack>
  );
}
