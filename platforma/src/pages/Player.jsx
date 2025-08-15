import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n';

export default function Player() {
  const { t } = useLanguage();
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState(null);

  useEffect(() => {
    if (!playerId) {
      setErrorKey('noPlayer');
      setLoading(false);
      return;
    }

    async function fetchPlayer() {
      try {
        const snapshot = await getDoc(doc(db, 'players', playerId));
        if (snapshot.exists()) {
          setPlayer({ id: snapshot.id, ...snapshot.data() });
          setErrorKey(null);
        } else {
          setErrorKey('notFound');
          setPlayer(null);
        }
      } catch (err) {
        console.error(err);
        setErrorKey('failed');
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [playerId]);

  if (loading)
    return (
      <PageLayout title={t('pages.player')}>
        <p>{t('player.loading')}</p>
      </PageLayout>
    );
  if (errorKey)
    return (
      <PageLayout title={t('pages.player')}>
        <p>{t(`player.${errorKey}`)}</p>
      </PageLayout>
    );
  if (!player) return null;

  return (
    <PageLayout title={player.name}>
      {player.team?.name && <p>{t('player.team')}: {player.team.name}</p>}
      {player.position && <p>{t('player.position')}: {player.position}</p>}
      {player.number && <p>{t('player.number')}: {player.number}</p>}
      {player.birthDate && <p>{t('player.birthDate')}: {player.birthDate}</p>}
      {player.birthPlace && <p>{t('player.birthPlace')}: {player.birthPlace}</p>}
      {player.height && <p>{t('player.height')}: {player.height}</p>}
      {player.weight && <p>{t('player.weight')}: {player.weight}</p>}
      {player.previousTeams?.length > 0 && (
        <div>
          <p>{t('player.previousTeams')}:</p>
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
