import PageLayout from '../components/PageLayout';
import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Image } from '@fluentui/react';
import sponsors from '../data/sponsors';

const useStyles = makeStyles({
  grid: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    alignItems: 'center',
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  image: {
    width: '100%',
    height: '80px',
    objectFit: 'contain',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: 'white',
  },
});

export default function Sponsors() {
  const styles = useStyles();
  return (
    <PageLayout title="Sponsors">
      <div className={styles.grid}>
        {sponsors.map((name) => (
          <Card key={name} className={styles.card}>
            <Image
              src={`https://placehold.co/300x80?text=${encodeURIComponent(name)}`}
              alt={name}
              className={styles.image}
            />
            <Text weight="semibold" align="center">
              {name}
            </Text>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

