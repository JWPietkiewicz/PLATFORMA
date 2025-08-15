import { Stack, Image } from '@fluentui/react';
import { Text, makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke1)'),
    ...shorthands.padding(tokens.spacingHorizontalS),
    minWidth: '160px',
    boxShadow: tokens.shadow16,
    borderRadius: tokens.borderRadiusMedium,
  },
  header: {
    backgroundColor: 'var(--colorNeutralForeground2BrandHover)',
    color: 'var(--colorNeutralForeground1)',
    textAlign: 'center',
    ...shorthands.padding('4px'),
    margin: `-${tokens.spacingHorizontalS} -${tokens.spacingHorizontalS} ${tokens.spacingHorizontalS}`,
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
  },
  teamRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: tokens.spacingHorizontalS,
  },
  venue: {
    textAlign: 'center',
  },
});

export default function GameCard({ game }) {
  const styles = useStyles();
  const dateObj = game.date?.toDate ? game.date.toDate() : new Date(game.date);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Stack className={styles.card} tokens={{ childrenGap: 4 }}>
      <div className={styles.header}>
        <Text size={200}>{date} {time}</Text>
      </div>
      <div className={styles.teamRow}>
        {game.teamA?.logoUrl && (
          <Image src={game.teamA.logoUrl} width={24} height={24} alt={game.teamA.name} />
        )}
        <Text>{game.teamA?.name}</Text>
        <Text weight="semibold">{game.teamAScore}</Text>
      </div>
      <div className={styles.teamRow}>
        {game.teamB?.logoUrl && (
          <Image src={game.teamB.logoUrl} width={24} height={24} alt={game.teamB.name} />
        )}
        <Text>{game.teamB?.name}</Text>
        <Text weight="semibold">{game.teamBScore}</Text>
      </div>
      <Text className={styles.venue} size={200}>{game.venue}</Text>
    </Stack>
  );
}

