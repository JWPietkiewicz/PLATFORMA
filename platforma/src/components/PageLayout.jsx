import { Stack } from '@fluentui/react';
import { Text, makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    ...shorthands.padding('20px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
});

export default function PageLayout({ title, children }) {
  const styles = useStyles();
  return (
    <Stack tokens={{ childrenGap: 20 }} className={styles.container}>
      {title && (
        <Text as="h1" size={800} block>
          {title}
        </Text>
      )}
      {children}
    </Stack>
  );
}
