import { Text } from '@fluentui/react-components';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <div
      style={{
        padding: 20,
        background: 'var(--colorNeutralForeground2BrandHover)',
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
        {t('footer.copyright')}
      </Text>
    </div>
  );
}

