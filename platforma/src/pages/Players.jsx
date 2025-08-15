import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Input, Dropdown, Option } from '@fluentui/react-components';
import { Stack } from '@fluentui/react';
import PageLayout from '../components/PageLayout';
import { db } from '../firebase';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('all');
  const [league, setLeague] = useState('all');
  const [season, setSeason] = useState('all');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const snapshot = await getDocs(collection(db, 'players'));
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPlayers(list);
      } catch (err) {
        console.error(err);
        setError('Failed to load players');
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, []);

  const teams = useMemo(
    () => Array.from(new Set(players.map((p) => p.team).filter(Boolean))).sort(),
    [players]
  );
  const leagues = useMemo(
    () => Array.from(new Set(players.map((p) => p.league).filter(Boolean))).sort(),
    [players]
  );
  const seasons = useMemo(
    () => Array.from(new Set(players.map((p) => p.season).filter(Boolean))).sort(),
    [players]
  );

  const filteredPlayers = useMemo(() => {
    return players
      .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => team === 'all' || p.team === team)
      .filter((p) => league === 'all' || p.league === league)
      .filter((p) => season === 'all' || p.season === season)
      .sort((a, b) =>
        sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  }, [players, search, team, league, season, sort]);

  if (loading)
    return (
      <PageLayout title="Players">
        <p>Loading players...</p>
      </PageLayout>
    );
  if (error)
    return (
      <PageLayout title="Players">
        <p>{error}</p>
      </PageLayout>
    );

  return (
    <PageLayout title="Players">
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(_, data) => setSearch(data.value)}
          />
          <Dropdown
            selectedOptions={[sort]}
            onOptionSelect={(_, data) => setSort(data.optionValue)}
          >
            <Option value="asc">A-Z</Option>
            <Option value="desc">Z-A</Option>
          </Dropdown>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <Dropdown
            selectedOptions={[team]}
            onOptionSelect={(_, data) => setTeam(data.optionValue)}
          >
            <Option value="all">All Teams</Option>
            {teams.map((t) => (
              <Option key={t} value={t}>
                {t}
              </Option>
            ))}
          </Dropdown>
          <Dropdown
            selectedOptions={[league]}
            onOptionSelect={(_, data) => setLeague(data.optionValue)}
          >
            <Option value="all">All Leagues</Option>
            {leagues.map((l) => (
              <Option key={l} value={l}>
                {l}
              </Option>
            ))}
          </Dropdown>
          <Dropdown
            selectedOptions={[season]}
            onOptionSelect={(_, data) => setSeason(data.optionValue)}
          >
            <Option value="all">All Seasons</Option>
            {seasons.map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Dropdown>
        </Stack>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {filteredPlayers.map((player) => (
            <li key={player.id}>
              <Link to={`/player/${player.id}`}>{player.name}</Link>
            </li>
          ))}
        </ul>
      </Stack>
    </PageLayout>
  );
}

