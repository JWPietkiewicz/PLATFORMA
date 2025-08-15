import { Stack, Image } from '@fluentui/react';
import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    ...shorthands.padding('20px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    boxShadow: tokens.shadow4,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  image: {
    width: '100%',
    height: 'auto',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  map: {
    width: '100%',
    height: '300px',
    border: 0,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
});

export default function Venue({ name, image, address, description, location }) {
  const styles = useStyles();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    location || address,
  )}&output=embed`;

  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      <Card className={styles.card}>
        <Text as="h1" size={800} block style={{ color: 'var(--colorNeutralForeground1)' }}>
          {name}
        </Text>
        {image && <Image src={image} alt={name} className={styles.image} />}
        {description && (
          <Text style={{ color: 'var(--colorNeutralForeground1)' }}>{description}</Text>
        )}
        {address && (
          <Text style={{ color: 'var(--colorNeutralForeground1)' }}>{address}</Text>
        )}
        <iframe
          title={`${name} location`}
          src={mapSrc}
          className={styles.map}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {location && location !== address && (
          <Text style={{ color: 'var(--colorNeutralForeground1)' }}>{location}</Text>
        )}
      </Card>
    </Stack>
  );
}
