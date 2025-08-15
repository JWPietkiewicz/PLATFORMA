import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Image } from '@fluentui/react';
import PageLayout from '../components/PageLayout';

const articles = [
  {
    title: 'Season opener thrills fans',
    image: 'https://placehold.co/600x400?text=Article+1',
    summary: 'The first match of the season delivered exciting moments and set the tone for a competitive year ahead.',
  },
  {
    title: 'Veteran player announces retirement',
    image: 'https://placehold.co/300x200?text=Article+2',
    summary: 'After a celebrated career, a beloved player decides to hang up his boots and move into coaching.',
  },
  {
    title: 'Training camp highlights',
    image: 'https://placehold.co/300x200?text=Article+3',
    summary: 'Coaches emphasize teamwork and endurance during an intense preseason training camp.',
  },
  {
    title: 'Rookie sensation shines',
    image: 'https://placehold.co/300x200?text=Article+4',
    summary: 'A new player captures attention with outstanding performances in practice scrimmages.',
  },
  {
    title: 'Community outreach event',
    image: 'https://placehold.co/200x150?text=Article+5',
    summary: 'Team members volunteer with local charities to give back to supporters.',
  },
  {
    title: 'Stadium upgrades completed',
    image: 'https://placehold.co/200x150?text=Article+6',
    summary: 'Fans will enjoy improved seating and facilities this season.',
  },
  {
    title: 'Charity match announced',
    image: 'https://placehold.co/200x150?text=Article+7',
    summary: 'Proceeds from the upcoming match will benefit community programs.',
  },
  {
    title: 'Mid-season break schedule',
    image: 'https://placehold.co/200x150?text=Article+8',
    summary: 'Teams prepare for a brief hiatus with friendly matches and rest days.',
  },
  {
    title: 'Youth academy prospects',
    image: 'https://placehold.co/200x150?text=Article+9',
    summary: 'Young talents showcase their skills in recent academy fixtures.',
  },
  {
    title: 'Historic rivalry renewed',
    image: 'https://placehold.co/400x200?text=Article+10',
    summary: 'Two long-time rivals meet again in a highly anticipated clash.',
  },
  {
    title: 'Injury report update',
    image: 'https://placehold.co/400x200?text=Article+11',
    summary: 'Coaches provide timelines for players recovering from injuries.',
  },
  {
    title: 'Playoff format explained',
    image: 'https://placehold.co/400x200?text=Article+12',
    summary: 'A breakdown of how teams will qualify for the postseason tournament.',
  },
];

const useStyles = makeStyles({
  topSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '20px',
  },
  largeCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  largeImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  mediumColumn: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  mediumCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  mediumImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  smallGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  smallCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '6px',
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  smallImage: {
    width: '100%',
    height: '80px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  olderList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  wideCard: {
    display: 'flex',
    columnGap: '16px',
    alignItems: 'center',
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  wideImage: {
    width: '160px',
    height: '100px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
});

export default function News() {
  const styles = useStyles();

  const latestArticle = articles[0];
  const mediumArticles = articles.slice(1, 4);
  const smallArticles = articles.slice(4, 9);
  const olderArticles = articles.slice(9);

  return (
    <PageLayout title="News">
      <div className={styles.topSection}>
        <Card className={styles.largeCard}>
          <Image
            src={latestArticle.image}
            alt={latestArticle.title}
            className={styles.largeImage}
          />
          <Text weight="semibold" as="h2">
            {latestArticle.title}
          </Text>
          <Text>{latestArticle.summary}</Text>
        </Card>
        <div className={styles.mediumColumn}>
          {mediumArticles.map((article) => (
            <Card key={article.title} className={styles.mediumCard}>
              <Image
                src={article.image}
                alt={article.title}
                className={styles.mediumImage}
              />
              <Text weight="semibold" as="h3">
                {article.title}
              </Text>
              <Text>{article.summary}</Text>
            </Card>
          ))}
        </div>
      </div>
      <div className={styles.smallGrid}>
        {smallArticles.map((article) => (
          <Card key={article.title} className={styles.smallCard}>
            <Image
              src={article.image}
              alt={article.title}
              className={styles.smallImage}
            />
            <Text weight="semibold" as="h4">
              {article.title}
            </Text>
          </Card>
        ))}
      </div>
      <div className={styles.olderList}>
        {olderArticles.map((article) => (
          <Card key={article.title} className={styles.wideCard}>
            <Image
              src={article.image}
              alt={article.title}
              className={styles.wideImage}
            />
            <div>
              <Text weight="semibold" as="h4">
                {article.title}
              </Text>
              <Text>{article.summary}</Text>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

