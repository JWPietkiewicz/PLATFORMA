import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
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
  winnerTeam: {
    ...shorthands.border('2px', 'solid', tokens.colorStatusSuccessForeground1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  score: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '4px',
  },
  lineRight: {
    position: 'absolute',
    top: '50%',
    right: '-24px',
    width: '24px',
    height: '2px',
    backgroundColor: tokens.colorNeutralStroke1,
  },
  lineLeft: {
    position: 'absolute',
    top: '50%',
    left: '-24px',
    width: '24px',
    height: '2px',
    backgroundColor: tokens.colorNeutralStroke1,
  },
  lineVerticalRight: {
    position: 'absolute',
    right: '-24px',
    width: '2px',
    backgroundColor: tokens.colorNeutralStroke1,
  },
  lineVerticalLeft: {
    position: 'absolute',
    left: '-24px',
    width: '2px',
    backgroundColor: tokens.colorNeutralStroke1,
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
  const scores = sides.map((s) => (s.score ?? 0));
  const winnerIndex = scores[0] >= scores[1] ? 0 : 1;
  return (
    <Card className={styles.match} appearance="filled" style={style}>
      {sides.map((side, i) => {
        const isWinner = winnerIndex === i;
        return (
          <div
            key={i}
            className={mergeClasses(styles.team, isWinner && styles.winnerTeam)}
          >
            <Text weight={isWinner ? 'semibold' : 'regular'}>{side.team}</Text>
            <div className={styles.score}>
              {side.score !== undefined && (
                <Text weight={isWinner ? 'semibold' : 'regular'}>
                  {side.score}
                </Text>
              )}
            </div>
          </div>
        );
      })}
      {hasNext && <div className={styles.lineRight} />}
      {hasPrev && <div className={styles.lineLeft} />}
      {hasNext && index % 2 === 0 && (
        <div
          className={styles.lineVerticalRight}
          style={{ top: '50%', height: nextConnectorHeight }}
        />
      )}
      {hasPrev && (
        <div
          className={styles.lineVerticalLeft}
          style={{ top: 24 - prevConnectorHeight / 2, height: prevConnectorHeight }}
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

