import { useEffect, useState } from 'react';
import { Stack, IconButton } from '@fluentui/react';
import { collection, getDocs, getDoc, orderBy, query } from 'firebase/firestore';
import GameCard from './GameCard';
import { db } from '../firebase';

const visibleCount = 5;

export default function GameCarousel() {
  const [games, setGames] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchGames() {
      const gamesRef = collection(db, 'games');
      const q = query(gamesRef, orderBy('date'));
      const snap = await getDocs(q);
      const data = await Promise.all(
        snap.docs.map(async d => {
          const gameData = d.data();
          let teamA = {};
          let teamB = {};
          if (gameData.teamA) {
            const teamASnap = await getDoc(gameData.teamA);
            if (teamASnap.exists()) {
              teamA = { id: teamASnap.id, ...teamASnap.data() };
            }
          }
          if (gameData.teamB) {
            const teamBSnap = await getDoc(gameData.teamB);
            if (teamBSnap.exists()) {
              teamB = { id: teamBSnap.id, ...teamBSnap.data() };
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
    }
    fetchGames();
  }, []);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(games.length - visibleCount, i + 1));

  const visible = games.slice(index, index + visibleCount);

  return (
    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} styles={{ root: { maxWidth: 800, margin: '20px auto' } }}>
      <IconButton iconProps={{ iconName: 'ChevronLeft' }} ariaLabel="Previous" onClick={prev} disabled={index === 0} />
      <Stack horizontal tokens={{ childrenGap: 8 }} styles={{ root: { overflow: 'hidden' } }}>
        {visible.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </Stack>
      <IconButton iconProps={{ iconName: 'ChevronRight' }} ariaLabel="Next" onClick={next} disabled={index + visibleCount >= games.length} />
    </Stack>
  );
}

