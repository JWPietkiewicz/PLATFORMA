import * as React from 'react';
import { Button, makeStyles, tokens, Spinner, Text } from '@fluentui/react-components';
import { ChevronLeft24Regular, ChevronRight24Regular } from '@fluentui/react-icons';
import { collection, getDocs, getDoc, orderBy, query } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import GameCard from './GameCard';
import { db } from '../firebase';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingHorizontalM,
    maxWidth: '840px',
    margin: `${tokens.spacingVerticalXLarge} auto`,
  },
  track: {
    display: 'flex',
    overflow: 'hidden',
    gap: tokens.spacingHorizontalM,
  },
});

const visibleCount = 5;

export default function GameCarousel() {
  const styles = useStyles();
  const [games, setGames] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const storage = getStorage();
    async function fetchGames() {
      if (!db) {
        setError(new Error('No database connection'));
        setLoading(false);
        return;
      }
      try {
        const gamesRef = collection(db, 'games');
        const q = query(gamesRef, orderBy('date'));
        const snap = await getDocs(q);
        const data = await Promise.all(
          snap.docs.map(async d => {
            const gameData = d.data();
            let teamA = {};
            let teamB = {};
            if (gameData.teamA) {
              try {
                const teamASnap = await getDoc(gameData.teamA);
                if (teamASnap.exists()) {
                  teamA = { id: teamASnap.id, ...teamASnap.data() };
                  if (teamA.logo) {
                    try {
                      const logoRef = ref(
                        storage,
                        `gs://platforma3lk.firebasestorage.app/${teamA.logo}`
                      );
                      teamA.logoUrl = await getDownloadURL(logoRef);
                    } catch (e) {
                      console.error('Failed to fetch team A logo', e);
                    }
                  }
                }
              } catch (e) {
                console.error('Failed to fetch team A', e);
              }
            }
            if (gameData.teamB) {
              try {
                const teamBSnap = await getDoc(gameData.teamB);
                if (teamBSnap.exists()) {
                  teamB = { id: teamBSnap.id, ...teamBSnap.data() };
                  if (teamB.logo) {
                    try {
                      const logoRef = ref(
                        storage,
                        `gs://platforma3lk.firebasestorage.app/${teamB.logo}`
                      );
                      teamB.logoUrl = await getDownloadURL(logoRef);
                    } catch (e) {
                      console.error('Failed to fetch team B logo', e);
                    }
                  }
                }
              } catch (e) {
                console.error('Failed to fetch team B', e);
              }
            }
            return { id: d.id, ...gameData, teamA, teamB };
          })
        );
        setGames(data);

        const now = new Date();
        let upcoming = data.findIndex(g => {
          const d = g.date?.toDate ? g.date.toDate() : new Date(g.date);
          return d > now;
        });
        if (upcoming === -1) upcoming = data.length;
        const start = Math.max(0, upcoming - 3);
        setIndex(start);
      } catch (e) {
        console.error('Failed to fetch games', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () =>
    setIndex(i => Math.min(Math.max(0, games.length - visibleCount), i + 1));

  const visible = games.slice(index, index + visibleCount);

  if (loading) {
    return (
      <div className={styles.root}>
        <Spinner />
      </div>
    );
  }

  if (error || games.length === 0) {
    return (
      <div className={styles.root}>
        <Text>No games available</Text>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Button
        appearance="subtle"
        icon={<ChevronLeft24Regular />}
        aria-label="Previous games"
        onClick={prev}
        disabled={index === 0}
      />
      <div className={styles.track}>
        {visible.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <Button
        appearance="subtle"
        icon={<ChevronRight24Regular />}
        aria-label="Next games"
        onClick={next}
        disabled={index + visibleCount >= games.length}
      />
    </div>
  );
}

