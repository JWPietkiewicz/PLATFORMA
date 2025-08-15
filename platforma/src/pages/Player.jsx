import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PageLayout from '../components/PageLayout';

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

  if (loading)
    return (
      <PageLayout title="Player">
        <p>Loading player...</p>
      </PageLayout>
    );
  if (error)
    return (
      <PageLayout title="Player">
        <p>{error}</p>
      </PageLayout>
    );
  if (!player) return null;

  return (
    <PageLayout title={player.name}>
      {player.team.name && <p>Team: {player.team}</p>}
      {player.position && <p>Position: {player.position}</p>}
      {player.number && <p>Number: {player.number}</p>}
      {player.birthDate && <p>Birth Date: {player.birthDate}</p>}
      {player.birthPlace && <p>Birth Place: {player.birthPlace}</p>}
      {player.height && <p>Height: {player.height}</p>}
      {player.weight && <p>Weight: {player.weight}</p>}
      {player.previousTeams?.length > 0 && (
        <div>
          <p>Previous Teams:</p>
          <ul>
            {player.previousTeams.map((team) => (
              <li key={team}>{team}</li>
            ))}
          </ul>
        </div>
      )}
      {player.bio && <p>{player.bio}</p>}
    </PageLayout>
  );
}
