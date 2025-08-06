import * as React from 'react';
import {
  Card,
  CardHeader,
  CardPreview,
  Image,
  Text,
  makeStyles,
} from '@fluentui/react-components';
import { Stack } from '@fluentui/react';

export interface Article {
  title: string;
  shortDescription: string;
  author: string;
  dateAdded: string;
  picture: string;
  content: string;
}

export interface ArticleProps {
  article: Article;
}

const useStyles = makeStyles({
  fullImage: {
    width: '100%',
    height: 'auto',
  },
  smallCard: {
    width: '300px',
  },
  smallPreview: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
});

export const FullArticle: React.FC<ArticleProps> = ({ article }) => {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader
        header={<Text weight="semibold">{article.title}</Text>}
        description={
          <Text>{`${article.author} • ${new Date(article.dateAdded).toLocaleDateString()}`}</Text>
        }
      />
      <CardPreview>
        <Image src={article.picture} alt={article.title} className={styles.fullImage} />
      </CardPreview>
      <Stack tokens={{ padding: 12 }}>
        <Text>{article.content}</Text>
      </Stack>
    </Card>
  );
};

export const BigCardArticle: React.FC<ArticleProps> = ({ article }) => {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader
        header={<Text weight="semibold">{article.title}</Text>}
        description={
          <Text>{`${article.author} • ${new Date(article.dateAdded).toLocaleDateString()}`}</Text>
        }
      />
      <CardPreview>
        <Image src={article.picture} alt={article.title} className={styles.fullImage} />
      </CardPreview>
      <Stack tokens={{ padding: 12 }}>
        <Text>{article.shortDescription}</Text>
      </Stack>
    </Card>
  );
};

export const SmallCardArticle: React.FC<ArticleProps> = ({ article }) => {
  const styles = useStyles();
  return (
    <Card orientation="horizontal" className={styles.smallCard}>
      <CardPreview>
        <Image src={article.picture} alt={article.title} className={styles.smallPreview} />
      </CardPreview>
      <Stack tokens={{ childrenGap: 12 }}>
        <CardHeader
          header={<Text weight="semibold">{article.title}</Text>}
          description={
            <Text>{`${article.author} • ${new Date(article.dateAdded).toLocaleDateString()}`}</Text>
          }
        />
        <Text>{article.shortDescription}</Text>
      </Stack>
    </Card>
  );
};

export const NoImageCardArticle: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Card>
      <CardHeader
        header={<Text weight="semibold">{article.title}</Text>}
        description={
          <Text>{`${article.author} • ${new Date(article.dateAdded).toLocaleDateString()}`}</Text>
        }
      />
      <Stack tokens={{ padding: 12 }}>
        <Text>{article.shortDescription}</Text>
      </Stack>
    </Card>
  );
};

