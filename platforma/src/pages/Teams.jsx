import { useEffect, useMemo, useState } from 'react';
import { Stack } from '@fluentui/react';
import {
  Dropdown,
  Input,
  Option,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PageLayout from '../components/PageLayout';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [league, setLeague] = useState('');
  const [season, setSeason] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    async function fetchTeams() {
      try {
        const snapshot = await getDocs(collection(db, 'teams'));
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeams(list);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load teams');
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  const leagues = useMemo(
    () => Array.from(new Set(teams.map((t) => t.league).filter(Boolean))),
    [teams],
  );
  const seasons = useMemo(
    () => Array.from(new Set(teams.map((t) => t.season).filter(Boolean))),
    [teams],
  );

  const filteredTeams = useMemo(() => {
    let list = teams;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.name?.toLowerCase().includes(q));
    }
    if (league) list = list.filter((t) => t.league === league);
    if (season) list = list.filter((t) => String(t.season) === season);
    return list
      .slice()
      .sort((a, b) =>
        sortDir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
  }, [teams, search, league, season, sortDir]);

  if (loading)
    return (
      <PageLayout title="Teams">
        <p>Loading teams...</p>
      </PageLayout>
    );

  if (error)
    return (
      <PageLayout title="Teams">
        <p>{error}</p>
      </PageLayout>
    );

  return (
    <PageLayout title="Teams">
      <Stack tokens={{ childrenGap: 10 }}>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(_, data) => setSearch(data.value)}
        />
        <Dropdown
          placeholder="Select league"
          selectedOptions={league ? [league] : []}
          onOptionSelect={(_, data) => setLeague(data.optionValue || '')}
        >
          <Option value="">All leagues</Option>
          {leagues.map((l) => (
            <Option key={l} value={l}>
              {l}
            </Option>
          ))}
        </Dropdown>
        <Dropdown
          placeholder="Select season"
          selectedOptions={season ? [season] : []}
          onOptionSelect={(_, data) => setSeason(data.optionValue || '')}
        >
          <Option value="">All seasons</Option>
          {seasons.map((s) => (
            <Option key={s} value={String(s)}>
              {s}
            </Option>
          ))}
        </Dropdown>
        <Dropdown
          selectedOptions={[sortDir]}
          onOptionSelect={(_, data) => setSortDir(data.optionValue)}
        >
          <Option value="asc">Sort A-Z</Option>
          <Option value="desc">Sort Z-A</Option>
        </Dropdown>
      </Stack>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>League</TableHeaderCell>
            <TableHeaderCell>Season</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTeams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.league}</TableCell>
              <TableCell>{team.season}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredTeams.length === 0 && <p>No teams found</p>}
    </PageLayout>
  );
}
