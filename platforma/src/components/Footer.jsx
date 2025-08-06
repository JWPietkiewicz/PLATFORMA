import { Text } from '@fluentui/react-components';

export default function Footer() {
  return (
    <div
      style={{
        padding: 20,
        background: 'var(--colorNeutralBackground1)',
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <img
        src="https://3lk-admin.plka.pl/media-files/league/images/LOGO_3LK_WHITE_FqTzfmx.png"
        alt="3LK logo"
        style={{ height: 40 }}
      />
      <Text style={{ color: 'var(--colorNeutralForeground1)' }} size={200}>
        © 2023 Amateur Basketball League
      </Text>
    </div>
  );
}

