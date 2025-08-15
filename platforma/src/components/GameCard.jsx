import * as React from 'react';
import {
  Card,
  CardHeader,
  Text,
  Badge,
  Image,
  makeStyles,
  shorthands,
  tokens,
  Caption1,
} from '@fluentui/react-components';
import { Location24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    maxWidth: '420px',
    width: '100%',
    backgroundColor: 'var(--colorNeutralBackground1)',
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    boxShadow: tokens.shadow28,
    // Subtle border for light/dark modes
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke2)'),
  },
  headerBar: {
    background:
      'linear-gradient(90deg, var(--colorBrandBackground) 0%, var(--colorBrandBackground2, var(--colorBrandBackground)) 100%)',
    color: 'var(--colorNeutralForegroundOnBrand)',
    textAlign: 'center',
    ...shorthands.padding(tokens.spacingHorizontalSNudge, tokens.spacingHorizontalM),
    ...shorthands.borderTopLeftRadius(tokens.borderRadiusXLarge),
    ...shorthands.borderTopRightRadius(tokens.borderRadiusXLarge),
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalS,
    flexWrap: 'wrap',
  },
  body: {
    display: 'grid',
    gridTemplateRows: 'auto auto auto',
    rowGap: tokens.spacingVerticalS,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  teamRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
  },
  teamLogo: {
    width: '28px',
    height: '28px',
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: 'var(--colorNeutralBackground3)',
    ...shorthands.overflow('hidden'),
  },
  teamName: {
    minWidth: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  scorePill: {
    justifySelf: 'end',
    backgroundColor: 'var(--colorNeutralBackground3)',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('2px', tokens.spacingHorizontalSNudge),
    fontVariantNumeric: 'tabular-nums',
  },
  divider: {
    height: 1,
    backgroundColor: 'var(--colorNeutralStroke2)',
    opacity: 0.6,
    marginTop: tokens.spacingVerticalSNudge,
    marginBottom: tokens.spacingVerticalSNudge,
  },
  venueRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalSNudge,
    color: 'var(--colorNeutralForeground2)',
  },
});

export default function GameCard({ game }) {
  const styles = useStyles();

  const dateObj = game?.date?.toDate ? game.date.toDate() : new Date(game?.date);

  // Defensive: if date is invalid, avoid throwing
  const isValidDate = dateObj instanceof Date && !isNaN(dateObj.getTime());
  const dateStr = isValidDate
    ? new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(dateObj)
    : '';
  const timeStr = isValidDate
    ? new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(dateObj)
    : '';

  return (
    <Card className={styles.card} appearance="filled">
      {/* Header bar */}
      <div className={styles.headerBar}>
        <div className={styles.headerContent}>
          <Text size={300} weight="semibold">
            {dateStr}
          </Text>
          {timeStr && <Badge appearance="tint" color="brand" size="small">{timeStr}</Badge>}
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Team A */}
        <div className={styles.teamRow}>
          {game?.teamA?.logoUrl ? (
            <Image src={game.teamA.logoUrl} alt={game?.teamA?.name ?? 'Team A'} className={styles.teamLogo} fit="cover" />
          ) : (
            <div className={styles.teamLogo} />
          )}
          <Text className={styles.teamName}>{game?.teamA?.name ?? 'Team A'}</Text>
          <Text weight="semibold" className={styles.scorePill}>
            {game?.teamAScore ?? '—'}
          </Text>
        </div>

        <div className={styles.divider} />

        {/* Team B */}
        <div className={styles.teamRow}>
          {game?.teamB?.logoUrl ? (
            <Image src={game.teamB.logoUrl} alt={game?.teamB?.name ?? 'Team B'} className={styles.teamLogo} fit="cover" />
          ) : (
            <div className={styles.teamLogo} />
          )}
          <Text className={styles.teamName}>{game?.teamB?.name ?? 'Team B'}</Text>
          <Text weight="semibold" className={styles.scorePill}>
            {game?.teamBScore ?? '—'}
          </Text>
        </div>

        {/* Venue */}
        {game?.venue && (
          <div className={styles.venueRow}>
            <Location24Regular />
            <Caption1>{game.venue}</Caption1>
          </div>
        )}
      </div>

      {/* Optional CardHeader for accessibility / semantics */}
      <CardHeader visuallyHidden headerText={`${game?.teamA?.name ?? 'Team A'} vs ${game?.teamB?.name ?? 'Team B'}`} />
    </Card>
  );
}

