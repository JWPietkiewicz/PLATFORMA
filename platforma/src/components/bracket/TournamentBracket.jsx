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
  },
  team: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '4px',
  },
  score: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '4px',
  },
  scoreValue: {
    ...shorthands.padding('0', '4px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  winScore: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  loseScore: {
    backgroundColor: tokens.colorStatusDangerBackground1,
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
  const isDark = theme.colorNeutralForeground1 === '#ffffff';
  const connectorColor = isDark ? '#fff' : '#000';
  const scores = sides.map((s) => (s.score ?? 0));
  const winnerIndex = scores[0] >= scores[1] ? 0 : 1;
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

export default function TournamentBracket({ rounds }) {
  const styles = useStyles();
  const matchSpacing = 72; // match height + gap
  return (
    <div className={styles.bracket}>
      {rounds.map((round, rIndex) => {
        const isThirdPlace = round.name === 'Third Place';
        return (
          <div key={rIndex} className={styles.round}>
            <Text weight="semibold">{round.name}</Text>
            {round.matches.map((match, mIndex) => {
              const spacing = matchSpacing * Math.pow(2, rIndex);
              let marginTop;
              if (isThirdPlace) {
                marginTop = mIndex === 0 ? 0 : spacing - 48;
              } else {
                const offset = rIndex === 0 ? 0 : spacing / 2 - 24;
                marginTop = mIndex === 0 ? offset : spacing - 48;
              }
              const hasPrev = !isThirdPlace && rIndex > 0;
              const nextIsThird = rounds[rIndex + 1]?.name === 'Third Place';
              const hasNext = !isThirdPlace && !nextIsThird && rIndex < rounds.length - 1;
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
          </div>
        );
      })}
    </div>
  );
}

