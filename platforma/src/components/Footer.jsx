import { Stack, Text } from '@fluentui/react';

export default function Footer() {
  return (
    <Stack horizontalAlign="center" styles={{ root: { padding: 20, background: '#f3f2f1' } }}>
      <Text variant="small">© 2023 Amateur Basketball League</Text>
    </Stack>
  );
}

