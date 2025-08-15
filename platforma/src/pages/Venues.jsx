import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Stack } from '@fluentui/react';
import { Input, Dropdown, Option, Label } from '@fluentui/react-components';
import PageLayout from '../components/PageLayout';
import Venue from '../components/Venue';
import { db } from '../firebase';

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    async function fetchVenues() {
      try {
        const snapshot = await getDocs(collection(db, 'venues'));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setVenues(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  const cities = useMemo(() => {
    const allCities = venues.map((v) => v.city).filter(Boolean);
    return Array.from(new Set(allCities));
  }, [venues]);

  const filteredVenues = useMemo(() => {
    let list = venues;

    if (search) {
      const lower = search.toLowerCase();
      list = list.filter((v) => v.name?.toLowerCase().includes(lower));
    }

    if (cityFilter) {
      list = list.filter((v) => v.city === cityFilter);
    }

    list = [...list].sort((a, b) => {
      const aName = a.name?.toLowerCase() ?? '';
      const bName = b.name?.toLowerCase() ?? '';
      return sortOrder === 'desc'
        ? bName.localeCompare(aName)
        : aName.localeCompare(bName);
    });

    return list;
  }, [venues, search, sortOrder, cityFilter]);

  if (loading) {
    return (
      <PageLayout title="Venues">
        <p>Loading venues...</p>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Venues">
        <p>{error}</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Venues">
      <Stack tokens={{ childrenGap: 16 }}>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(_, data) => setSearch(data.value)}
        />
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Label htmlFor="sort">Sort</Label>
          <Dropdown
            id="sort"
            value={sortOrder}
            onOptionSelect={(_, data) => setSortOrder(data.optionValue)}
          >
            <Option value="asc">A-Z</Option>
            <Option value="desc">Z-A</Option>
          </Dropdown>
          <Label htmlFor="city">City</Label>
          <Dropdown
            id="city"
            placeholder="All cities"
            value={cityFilter}
            onOptionSelect={(_, data) => setCityFilter(data.optionValue)}
          >
            <Option value="">All cities</Option>
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Dropdown>
        </Stack>
        <Stack tokens={{ childrenGap: 20 }}>
          {filteredVenues.map((venue) => (
            <Venue key={venue.id} {...venue} />
          ))}
          {filteredVenues.length === 0 && <p>No venues found.</p>}
        </Stack>
      </Stack>
    </PageLayout>
  );
}

