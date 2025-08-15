import * as React from 'react';
import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  Button,
  Divider,
  Badge,
  Link,
  Image,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { News20Regular, ArrowRight16Regular, MegaphoneLoud24Regular } from '@fluentui/react-icons';
import PageLayout from '../components/PageLayout';

const articles = [
  {
    title: 'Season opener thrills fans',
    image: 'https://placehold.co/1200x800?text=Article+1',
    summary:
      'The first match of the season delivered exciting moments and set the tone for a competitive year ahead.',
  },
  {
    title: 'Veteran player announces retirement',
    image: 'https://placehold.co/800x600?text=Article+2',
    summary:
      'After a celebrated career, a beloved player decides to hang up his boots and move into coaching.',
  },
  {
    title: 'Training camp highlights',
    image: 'https://placehold.co/800x600?text=Article+3',
    summary:
      'Coaches emphasize teamwork and endurance during an intense preseason training camp.',
  },
  {
    title: 'Rookie sensation shines',
    image: 'https://placehold.co/800x600?text=Article+4',
    summary:
      'A new player captures attention with outstanding performances in practice scrimmages.',
  },
  {
    title: 'Community outreach event',
    image: 'https://placehold.co/640x480?text=Article+5',
    summary: 'Team members volunteer with local charities to give back to supporters.',
  },
  {
    title: 'Stadium upgrades completed',
    image: 'https://placehold.co/640x480?text=Article+6',
    summary: 'Fans will enjoy improved seating and facilities this season.',
  },
  {
    title: 'Charity match announced',
    image: 'https://placehold.co/640x480?text=Article+7',
    summary: 'Proceeds from the upcoming match will benefit community programs.',
  },
  {
    title: 'Mid-season break schedule',
    image: 'https://placehold.co/640x480?text=Article+8',
    summary: 'Teams prepare for a brief hiatus with friendly matches and rest days.',
  },
  {
    title: 'Youth academy prospects',
    image: 'https://placehold.co/640x480?text=Article+9',
    summary: 'Young talents showcase their skills in recent academy fixtures.',
  },
  {
    title: 'Historic rivalry renewed',
    image: 'https://placehold.co/800x400?text=Article+10',
    summary: 'Two long-time rivals meet again in a highly anticipated clash.',
  },
  {
    title: 'Injury report update',
    image: 'https://placehold.co/800x400?text=Article+11',
    summary: 'Coaches provide timelines for players recovering from injuries.',
  },
  {
    title: 'Playoff format explained',
    image: 'https://placehold.co/800x400?text=Article+12',
    summary: 'A breakdown of how teams will qualify for the postseason tournament.',
  },
];

const useStyles = makeStyles({
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  topSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
    '@media (max-width: 1000px)': {
      gridTemplateColumns: '1fr',
    },
  },
  largeCard: {
    display: 'grid',
    gridTemplateRows: 'auto auto auto',
    rowGap: tokens.spacingVerticalS,
    backgroundColor: 'var(--colorNeutralBackground1)',
    boxShadow: tokens.shadow28,
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke2)'),
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    transitionProperty: 'transform, box-shadow',
    transitionDuration: tokens.durationNormal,
    ':hover': { transform: 'translateY(-2px)', boxShadow: tokens.shadow64 },
  },
  largePreview: {
    aspectRatio: '16 / 9',
    width: '100%',
    ...shorthands.borderTopLeftRadius(tokens.borderRadiusXLarge),
    ...shorthands.borderTopRightRadius(tokens.borderRadiusXLarge),
    overflow: 'hidden',
  },
  largeBody: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    display: 'grid',
    rowGap: tokens.spacingVerticalSNudge,
  },
  mediumColumn: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
  },
  mediumCard: {
    display: 'grid',
    backgroundColor: 'var(--colorNeutralBackground1)',
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke2)'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    boxShadow: tokens.shadow16,
    transition: 'transform 120ms ease, box-shadow 120ms ease',
    ':hover': { transform: 'translateY(-1px)', boxShadow: tokens.shadow28 },
  },
  mediumPreview: {
    aspectRatio: '16 / 9',
    width: '100%',
    overflow: 'hidden',
    ...shorthands.borderTopLeftRadius(tokens.borderRadiusLarge),
    ...shorthands.borderTopRightRadius(tokens.borderRadiusLarge),
  },
  mediumBody: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    display: 'grid',
    rowGap: tokens.spacingVerticalSNudge,
  },
  smallGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  smallCard: {
    display: 'grid',
    backgroundColor: 'var(--colorNeutralBackground1)',
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke2)'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    boxShadow: tokens.shadow8,
    transition: 'box-shadow 120ms ease',
    ':hover': { boxShadow: tokens.shadow16 },
  },
  smallPreview: {
    aspectRatio: '16 / 9',
    width: '100%',
    overflow: 'hidden',
    ...shorthands.borderTopLeftRadius(tokens.borderRadiusLarge),
    ...shorthands.borderTopRightRadius(tokens.borderRadiusLarge),
  },
  smallBody: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  olderList: {
    display: 'grid',
    gap: tokens.spacingVerticalM,
  },
  wideCard: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    alignItems: 'center',
    backgroundColor: 'var(--colorNeutralBackground1)',
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke2)'),
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    boxShadow: tokens.shadow16,
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr',
    },
  },
  widePreview: {
    width: '100%',
    height: '100%',
    aspectRatio: '16 / 10',
    ...shorthands.borderTopLeftRadius(tokens.borderRadiusXLarge),
    ...shorthands.borderBottomLeftRadius(tokens.borderRadiusXLarge),
    overflow: 'hidden',
    '@media (max-width: 700px)': {
      ...shorthands.borderTopRightRadius(tokens.borderRadiusXLarge),
      ...shorthands.borderBottomLeftRadius('0'),
    },
  },
  titleClamp: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  summaryClamp: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    color: 'var(--colorNeutralForeground2)',
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
      <div className={styles.pageHeader}>
        <MegaphoneLoud24Regular />
        <Text size={500} weight="semibold">Latest headlines</Text>
        <Badge appearance="tint" color="brand">Club</Badge>
      </div>

      {/* Top section */}
      <div className={styles.topSection}>
        <Card className={styles.largeCard} appearance="filled">
          <CardPreview className={styles.largePreview}>
            <Image src={latestArticle.image} alt={latestArticle.title} fit="cover" />
          </CardPreview>
          <div className={styles.largeBody}>
            <Text as="h2" size={500} weight="semibold" className={styles.titleClamp}>
              {latestArticle.title}
            </Text>
            <Text className={styles.summaryClamp}>{latestArticle.summary}</Text>
            <div>
              <Button appearance="primary" icon={<ArrowRight16Regular />} iconPosition="after">
                Read more
              </Button>
            </div>
          </div>
        </Card>

        <div className={styles.mediumColumn}>
          {mediumArticles.map((article) => (
            <Card key={article.title} className={styles.mediumCard} appearance="filled">
              <CardPreview className={styles.mediumPreview}>
                <Image src={article.image} alt={article.title} fit="cover" />
              </CardPreview>
              <div className={styles.mediumBody}>
                <Text as="h3" weight="semibold" className={styles.titleClamp}>
                  {article.title}
                </Text>
                <Text className={styles.summaryClamp}>{article.summary}</Text>
                <Link>
                  Continue <ArrowRight16Regular />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Small grid */}
      <div className={styles.smallGrid}>
        {smallArticles.map((article) => (
          <Card key={article.title} className={styles.smallCard} appearance="filled">
            <CardPreview className={styles.smallPreview}>
              <Image src={article.image} alt={article.title} fit="cover" />
            </CardPreview>
            <div className={styles.smallBody}>
              <Text as="h4" weight="semibold" className={styles.titleClamp}>
                {article.title}
              </Text>
            </div>
          </Card>
        ))}
      </div>

      <Divider>Earlier</Divider>

      {/* Older list */}
      <div className={styles.olderList}>
        {olderArticles.map((article) => (
          <Card key={article.title} className={styles.wideCard} appearance="filled">
            <CardPreview className={styles.widePreview}>
              <Image src={article.image} alt={article.title} fit="cover" />
            </CardPreview>
            <CardHeader
              header={<Text as="h4" weight="semibold" className={styles.titleClamp}>{article.title}</Text>}
              description={<Text className={styles.summaryClamp}>{article.summary}</Text>}
              action={<Button appearance="secondary" icon={<News20Regular />}>Details</Button>}
            />
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

