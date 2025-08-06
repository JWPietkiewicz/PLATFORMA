import { Card, Text, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  bracket: {
    display: 'flex',
    columnGap: '24px',
    alignItems: 'flex-start',
  },
  round: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
  },
  match: {
    width: '160px',
    ...shorthands.padding('8px'),
  },
  team: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function Match({ sides }) {
  const styles = useStyles();
  return (
    <Card className={styles.match} appearance="filled">
      {sides.map((side, index) => (
        <div key={index} className={styles.team}>
          <Text>{side.team}</Text>
          {side.score !== undefined && (
            <Text weight="semibold">{side.score}</Text>
          )}
        </div>
      ))}
    </Card>
  );
}

export default function TournamentBracket({ rounds }) {
  const styles = useStyles();
  return (
    <div className={styles.bracket}>
      {rounds.map((round, rIndex) => (
        <div key={rIndex} className={styles.round}>
          <Text weight="semibold">{round.name}</Text>
          {round.matches.map((match) => (
            <Match key={match.id} sides={match.sides} />
          ))}
        </div>
      ))}
    </div>
  );
}

