import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import {
  Card,
  Text,
  Spinner,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { db } from '../firebase';

const useStyles = makeStyles({
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    ...shorthands.padding('24px'),
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
  },
  label: {
    color: tokens.colorNeutralForeground2,
  },
});

export default function Player() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) {
      setError('No player specified');
      setLoading(false);
      return;
    }

    async function fetchPlayer() {
      try {
        const snapshot = await getDoc(doc(db, 'players', playerId));
        if (snapshot.exists()) {
          setPlayer({ id: snapshot.id, ...snapshot.data() });
          setError(null);
        } else {
          setError('Player not found');
          setPlayer(null);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load player');
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [playerId]);

  const styles = useStyles();

  if (loading) return <Spinner label="Loading player..." />;
  if (error) return <Text>{error}</Text>;
  if (!player) return null;

  return (
    <Card className={styles.container} appearance="filled">
      <Text as="h1" size={800} weight="semibold" block>
        {player.name}
      </Text>
      {player.team && (
        <Text className={styles.label} block>
          Team: {player.team}
        </Text>
      )}
      {player.position && (
        <Text className={styles.label} block>
          Position: {player.position}
        </Text>
      )}
      {player.number && (
        <Text className={styles.label} block>
          Number: {player.number}
        </Text>
      )}
    </Card>
  );
}
