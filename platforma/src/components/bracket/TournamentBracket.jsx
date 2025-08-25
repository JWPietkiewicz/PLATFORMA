import * as React from 'react';
import {
  Card,
  CardHeader,
  Text,
  Caption1,
  Badge,
  Tooltip,
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
} from '@fluentui/react-components';
import { Trophy24Regular, Branch24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    columnGap: tokens.spacingHorizontalXL,
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  round: {
    minWidth: '360px',
    display: 'grid',
    rowGap: tokens.spacingVerticalS,
  },
  roundHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalSNudge,
    backgroundColor: 'var(--colorNeutralBackground1)',
    ...shorthands.padding(tokens.spacingVerticalSNudge, 0),
  },
  matchesStack: {
    display: 'block',
  },
  matchCard: {
    position: 'relative',
    minWidth: '360px',
    height: '84px',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    rowGap: 0,
    backgroundColor: 'var(--colorNeutralBackground1)',
    boxShadow: tokens.shadow16,
    ...shorthands.border('1px', 'solid', 'var(--colorNeutralStroke2)'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    transitionProperty: 'transform, box-shadow',
    transitionDuration: tokens.durationNormal,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow28,
    },
  },
  teamRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    // subtle divider between rows
    ':first-of-type': {
      boxShadow: 'inset 0 -1px var(--colorNeutralStroke2)'
    },
  },
  teamName: {
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  scorePill: {
    justifySelf: 'end',
    fontVariantNumeric: 'tabular-nums',
    ...shorthands.padding('2px', tokens.spacingHorizontalSNudge),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  scoreWin: {
    backgroundColor: tokens.colorStatusSuccessBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  scoreLose: {
    backgroundColor: tokens.colorStatusDangerBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  highlight: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':first-of-type': {
      boxShadow: 'inset 0 -1px rgba(255,255,255,0.2)'
    },
  },
  connectorHorizontalRight: {
    position: 'absolute',
    top: '50%',
    right: '-16px',
    width: '16px',
    height: '2px',
    transform: 'translateY(-50%)',
    backgroundColor: tokens.colorNeutralForeground3Hover,
    zIndex: 1,
  },
  connectorHorizontalLeft: {
    position: 'absolute',
    top: '50%',
    left: '-16px',
    width: '16px',
    height: '2px',
    transform: 'translateY(-50%)',
    backgroundColor: tokens.colorNeutralForeground3Hover,
    zIndex: 1,
  },
  connectorVerticalRight: {
    position: 'absolute',
    right: '-16px',
    width: '2px',
    backgroundColor: tokens.colorNeutralForeground3Hover,
    zIndex: 1,
  },
  connectorVerticalLeft: {
    position: 'absolute',
    left: '-16px',
    width: '2px',
    backgroundColor: tokens.colorNeutralForeground3Hover,
    zIndex: 1,
  },
  finalsBadge: {
    marginInlineStart: tokens.spacingHorizontalSNudge,
  },
  thirdPlaceSpacer: {
    height: tokens.spacingVerticalXL,
  },
});

function Match({
  sides,
  hasPrev,
  hasNext,
  index,
  prevConnectorHeight,
  nextConnectorHeight,
  style,
  hoveredTeamId,
  setHoveredTeamId,
}) {
  const styles = useStyles();

  const winnerIndex =
    sides[0].score === undefined
      ? 1
      : sides[1].score === undefined
      ? 0
      : sides[0].score >= sides[1].score
      ? 0
      : 1;

  const getScoreClass = (isWinner) =>
    mergeClasses(styles.scorePill, isWinner ? styles.scoreWin : styles.scoreLose);

  return (
    <Card appearance="filled" className={styles.matchCard} style={style} aria-label={`${sides[0]?.team ?? 'TBD'} vs ${sides[1]?.team ?? 'TBD'}`}>
      {sides.map((side, i) => {
        const isWinner = winnerIndex === i;
        const isHovered = hoveredTeamId === side.id;
        const rowClasses = mergeClasses(styles.teamRow, isHovered && styles.highlight);
        const scoreClasses = getScoreClass(isWinner);
        return (
          <Tooltip key={side.id ?? i} content={side.team} relationship="description">
            <div
              className={rowClasses}
              onMouseEnter={() => setHoveredTeamId(side.id)}
              onMouseLeave={() => setHoveredTeamId(null)}
              role="button"
              tabIndex={0}
            >
              <Text weight={isWinner ? 'semibold' : 'regular'} className={styles.teamName}>
                {side.team ?? 'TBD'}
              </Text>
              {side.score !== undefined ? (
                <Text weight={isWinner ? 'semibold' : 'regular'} className={scoreClasses}>
                  {side.score}
                </Text>
              ) : (
                <Badge appearance="outline" size="tiny">—</Badge>
              )}
            </div>
          </Tooltip>
        );
      })}

      {/* Connectors */}
      {hasNext && <div className={styles.connectorHorizontalRight} />}
      {hasPrev && <div className={styles.connectorHorizontalLeft} />}
      {hasNext && (
        <div
          className={styles.connectorVerticalRight}
          style={
            index % 2 === 0
              ? { top: '50%', height: nextConnectorHeight / 2 }
              : { bottom: '50%', height: nextConnectorHeight / 2 }
          }
        />
      )}
      {hasPrev && (
        <div
          className={styles.connectorVerticalLeft}
          style={{ top: `calc(50% - ${prevConnectorHeight / 2}px)`, height: prevConnectorHeight }}
        />
      )}

      {/* Hidden header for better screen reader context */}
      <CardHeader visuallyHidden header={<Text>{`${sides[0]?.team ?? 'TBD'} vs ${sides[1]?.team ?? 'TBD'}`}</Text>} />
    </Card>
  );
}

export default function TournamentBracket({ rounds = [] }) {
  const styles = useStyles();
  const [hoveredTeamId, setHoveredTeamId] = React.useState(null);

  // Layout metrics
  const matchHeight = 84;
  const matchSpacing = matchHeight + 28; // height + gap

  const thirdPlaceRound = rounds.find((r) => r.name === 'Third Place');
  const displayRounds = rounds.filter((r) => r.name !== 'Third Place');

  return (
    <div className={styles.root}>
      {displayRounds.map((round, rIndex) => {
        const isFinal = round.name?.toLowerCase?.() === 'finals' || round.name?.toLowerCase?.() === 'final';
        return (
          <div key={rIndex} className={styles.round}>
            <div className={styles.roundHeader}>
              {isFinal ? <Trophy24Regular /> : <Branch24Regular />}
              <Text weight="semibold">{round.name}</Text>
              {isFinal && (
                <Badge size="small" appearance="tint" color="brand" className={styles.finalsBadge}>
                  Title Match
                </Badge>
              )}
            </div>

            <div className={styles.matchesStack}>
              {round.matches.map((match, mIndex) => {
                const spacing = matchSpacing * Math.pow(2, rIndex);
                const offset = rIndex === 0 ? 0 : spacing / 2 - matchHeight / 2;
                const marginTop = mIndex === 0 ? offset : spacing - matchHeight;
                const hasPrev = rIndex > 0;
                const hasNext = rIndex < displayRounds.length - 1;
                const prevSpacing = matchSpacing * Math.pow(2, rIndex - 1);
                const nextSpacing = spacing;
                return (
                  <Match
                    key={match.id ?? `${rIndex}-${mIndex}`}
                    sides={match.sides}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                    index={mIndex}
                    prevConnectorHeight={prevSpacing}
                    nextConnectorHeight={nextSpacing}
                    style={{ marginTop }}
                    hoveredTeamId={hoveredTeamId}
                    setHoveredTeamId={setHoveredTeamId}
                  />
                );
              })}

              {/* Third place column appears under finals */}
              {isFinal && thirdPlaceRound && (
                <>
                  <div className={styles.thirdPlaceSpacer} />
                  <div className={styles.roundHeader}>
                    <Branch24Regular />
                    <Text weight="semibold">{thirdPlaceRound.name}</Text>
                    <Badge size="tiny" appearance="outline">Placement</Badge>
                  </div>
                  {thirdPlaceRound.matches.map((match, mIndex) => {
                    const marginTop = mIndex === 0 ? 0 : matchSpacing - matchHeight;
                    return (
                      <Match
                        key={match.id ?? `third-${mIndex}`}
                        sides={match.sides}
                        hasPrev={false}
                        hasNext={false}
                        index={mIndex}
                        prevConnectorHeight={0}
                        nextConnectorHeight={0}
                        style={{ marginTop }}
                        hoveredTeamId={hoveredTeamId}
                        setHoveredTeamId={setHoveredTeamId}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Screen-reader only label */}
      <Caption1 visuallyHidden>
        Tournament bracket. Use left and right arrow keys to scroll rounds.
      </Caption1>
    </div>
  );
}

