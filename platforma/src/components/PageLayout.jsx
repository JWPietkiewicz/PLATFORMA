import { Stack } from '@fluentui/react';
import { Text } from '@fluentui/react-components';

export default function PageLayout({ title, children }) {
  return (
    <Stack
      tokens={{ childrenGap: 20 }}
      styles={{ root: { width: '100%', maxWidth: 1200, margin: '0 auto', padding: 20 } }}
    >
      {title && (
        <Text as="h1" size={800} block>
          {title}
        </Text>
      )}
      {children}
    </Stack>
  );
}
