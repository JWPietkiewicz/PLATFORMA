import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
  useFluent,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  bracket: {
    display: 'flex',
    columnGap: '32px',
    alignItems: 'flex-start',
  },
  round: {
    display: 'flex',
    flexDirection: 'column',
  },
  match: {
    width: '160px',
    height: '48px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    ...shorthands.padding('8px'),
    overflow: 'visible',
  },
  team: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '4px',
    ...shorthands.padding('4px', '0'),
  },
  score: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '4px',
  },
  scoreValue: {
    ...shorthands.padding('2px', '4px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  winScore: {
    backgroundColor: tokens.colorStatusSuccessBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  loseScore: {
    backgroundColor: tokens.colorStatusDangerBackground3,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  lineRight: {
    position: 'absolute',
    top: '50%',
    right: '-24px',
    width: '24px',
    height: '2px',
  },
  lineLeft: {
    position: 'absolute',
    top: '50%',
    left: '-24px',
    width: '24px',
    height: '2px',
  },
  lineVerticalRight: {
    position: 'absolute',
    right: '-24px',
    width: '2px',
  },
  lineVerticalLeft: {
    position: 'absolute',
    left: '-24px',
    width: '2px',
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
}) {
  const styles = useStyles();
  const { theme } = useFluent();
  const isDark = theme?.colorNeutralForeground1 === '#ffffff';
  const connectorColor = isDark ? '#fff' : '#000';
  const winnerIndex =
    sides[0].score === undefined
      ? 1
      : sides[1].score === undefined
        ? 0
        : sides[0].score >= sides[1].score
          ? 0
          : 1;
  return (
    <Card className={styles.match} appearance="filled" style={style}>
      {sides.map((side, i) => {
        const isWinner = winnerIndex === i;
        return (
          <div
            key={i}
            className={styles.team}
          >
            <Text weight={isWinner ? 'semibold' : 'regular'}>{side.team}</Text>
            <div className={styles.score}>
              {side.score !== undefined && (
                <Text
                  weight={isWinner ? 'semibold' : 'regular'}
                  className={mergeClasses(
                    styles.scoreValue,
                    isWinner ? styles.winScore : styles.loseScore,
                  )}
                >
                  {side.score}
                </Text>
              )}
            </div>
          </div>
        );
      })}
      {hasNext && (
        <div
          className={styles.lineRight}
          style={{ backgroundColor: connectorColor }}
        />
      )}
      {hasPrev && (
        <div
          className={styles.lineLeft}
          style={{ backgroundColor: connectorColor }}
        />
      )}
      {hasNext && index % 2 === 0 && (
        <div
          className={styles.lineVerticalRight}
          style={{
            top: '50%',
            height: nextConnectorHeight,
            backgroundColor: connectorColor,
          }}
        />
      )}
      {hasPrev && (
        <div
          className={styles.lineVerticalLeft}
          style={{
            top: 24 - prevConnectorHeight / 2,
            height: prevConnectorHeight,
            backgroundColor: connectorColor,
          }}
        />
      )}
    </Card>
  );
}

export default function TournamentBracket({ rounds = [] }) {
  const styles = useStyles();
  const matchSpacing = 72; // match height + gap
  const thirdPlaceRound = rounds.find((r) => r.name === 'Third Place');
  const displayRounds = rounds.filter((r) => r.name !== 'Third Place');
  return (
    <div className={styles.bracket}>
      {displayRounds.map((round, rIndex) => {
        const isFinal = round.name === 'Finals';
        return (
          <div key={rIndex} className={styles.round}>
            <Text weight="semibold">{round.name}</Text>
            {round.matches.map((match, mIndex) => {
              const spacing = matchSpacing * Math.pow(2, rIndex);
              const offset = rIndex === 0 ? 0 : spacing / 2 - 24;
              const marginTop = mIndex === 0 ? offset : spacing - 48;
              const hasPrev = rIndex > 0;
              const hasNext = rIndex < displayRounds.length - 1;
              const prevSpacing = matchSpacing * Math.pow(2, rIndex - 1);
              const nextSpacing = spacing;
              return (
                <Match
                  key={match.id}
                  sides={match.sides}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  index={mIndex}
                  prevConnectorHeight={prevSpacing}
                  nextConnectorHeight={nextSpacing}
                  style={{ marginTop }}
                />
              );
            })}
            {isFinal && thirdPlaceRound && (
              <>
                <Text weight="semibold" style={{ marginTop: matchSpacing }}>
                  {thirdPlaceRound.name}
                </Text>
                {thirdPlaceRound.matches.map((match, mIndex) => {
                  const marginTop = mIndex === 0 ? 0 : matchSpacing - 48;
                  return (
                    <Match
                      key={match.id}
                      sides={match.sides}
                      hasPrev={false}
                      hasNext={false}
                      index={mIndex}
                      prevConnectorHeight={0}
                      nextConnectorHeight={0}
                      style={{ marginTop }}
                    />
                  );
                })}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

