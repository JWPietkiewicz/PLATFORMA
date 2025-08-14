import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Player() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const playerRef = doc(db, 'players', playerId);
        const snapshot = await getDoc(playerRef);
        if (snapshot.exists()) {
          setPlayer(snapshot.data());
        } else {
          setError('Player not found');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to load player');
      } finally {
        setLoading(false);
      }
    }

    if (playerId) {
      fetchPlayer();
    } else {
      setError('No player specified');
      setLoading(false);
    }
  }, [playerId]);

  if (loading) return <p>Loading player...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{player.name}</h1>
      <pre>{JSON.stringify(player, null, 2)}</pre>
    </div>
  );
}
