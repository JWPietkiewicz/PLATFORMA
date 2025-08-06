import * as React from 'react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import {
  FullArticle,
  BigCardArticle,
  SmallCardArticle,
  NoImageCardArticle,
  Article,
} from './ArticleComponents';

const sampleArticle: Article = {
  title: 'Sample Article Title',
  shortDescription: 'Short description of the sample article for demonstration purposes.',
  author: 'Jane Doe',
  dateAdded: '2024-06-01',
  picture: 'https://via.placeholder.com/800x400',
  content:
    'Full content of the article goes here. It can span multiple paragraphs and contains detailed information.',
};

export default function ArticleExample() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Stack tokens={{ childrenGap: 16 }}>
        <FullArticle article={sampleArticle} />
        <BigCardArticle article={sampleArticle} />
        <SmallCardArticle article={sampleArticle} />
        <NoImageCardArticle article={sampleArticle} />
      </Stack>
    </FluentProvider>
  );
}

