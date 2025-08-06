import { Stack, Text } from '@fluentui/react';

export default function Footer() {
  return (
    <Stack
      horizontal
      horizontalAlign="center"
      verticalAlign="center"
      tokens={{ childrenGap: 10 }}
      styles={{
        root: {
          padding: 20,
          background: '#f3f2f1',
          marginTop: 'auto',
        },
      }}
    >
      <img
        src="https://3lk-admin.plka.pl/media-files/league/images/LOGO_3LK_WHITE_FqTzfmx.png"
        alt="3LK logo"
        style={{ height: 40 }}
      />
      <Text variant="small">© 2023 Amateur Basketball League</Text>
    </Stack>
  );
}

