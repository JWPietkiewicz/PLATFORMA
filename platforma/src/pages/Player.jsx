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
    if (!playerId) {
      setError('No player specified');
      setLoading(false);
      return;
    }

    const playerRef = doc(db, 'players', playerId);
    getDoc(playerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPlayer({ id: snapshot.id, ...snapshot.data() });
        } else {
          setError('Player not found');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load player');
      })
      .finally(() => setLoading(false));
  }, [playerId]);

  if (loading) return <p>Loading player...</p>;
  if (error) return <p>{error}</p>;
  if (!player) return null;

  return (
    <div>
      <h1>{player.name}</h1>
      {player.team && <p>Team: {player.team}</p>}
      {player.position && <p>Position: {player.position}</p>}
      {player.number && <p>Number: {player.number}</p>}
    </div>
  );
}
