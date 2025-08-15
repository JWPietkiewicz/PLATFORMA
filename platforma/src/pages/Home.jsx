import ImageCarousel from '../components/ImageCarousel';
import PageLayout from '../components/PageLayout';
import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Image } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';

const useStyles = makeStyles({
  newsGrid: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  image: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
});

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const newsItems = t('home.newsItems');
  return (
    <PageLayout title={t('pages.home')}>
      <ImageCarousel />
      <div className={styles.newsGrid}>
        {newsItems.map((item) => (
          <Card key={item.title} className={styles.card}>
            <Image src={item.image} alt={item.title} className={styles.image} />
            <Text weight="semibold" as="h3">
              {item.title}
            </Text>
            <Text>{item.story}</Text>
          </Card>
        ))}
        <Card
          className={styles.card}
          onClick={() => navigate('/news')}
          style={{ cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}
        >
          <Text weight="semibold">{t('home.viewAllNews')}</Text>
        </Card>
      </div>
    </PageLayout>
  );
}
