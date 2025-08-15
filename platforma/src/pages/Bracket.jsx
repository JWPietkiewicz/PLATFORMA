import { Text } from '@fluentui/react-components';
import PageLayout from '../components/PageLayout';
import TournamentBracket from '../components/bracket/TournamentBracket';

function roundName(size) {
  if (size === 2) return 'Final';
  if (size === 4) return 'Semifinals';
  if (size === 8) return 'Quarterfinals';
  return `Round of ${size}`;
}

function generateBracket(teamCount) {
  const totalSlots = 2 ** Math.ceil(Math.log2(teamCount));
  const seeded = Array.from({ length: totalSlots }, (_, i) =>
    i < teamCount ? `Team ${i + 1}` : 'BYE',
  );
  const firstHalf = seeded.slice(0, totalSlots / 2);
  const secondHalf = seeded.slice(totalSlots / 2);
  const teams = [];
  for (let i = 0; i < firstHalf.length; i++) {
    teams.push(firstHalf[i], secondHalf[i]);
  }
  const rounds = [];
  let current = teams;
  let semifinalLosers = [];
  let id = 1;
  while (current.length > 1) {
    const matches = [];
    const next = [];
    const losers = [];
    for (let i = 0; i < current.length; i += 2) {
      const t1 = current[i];
      const t2 = current[i + 1];
      const winner = t1 === 'BYE' ? t2 : t1;
      const loser = t1 === 'BYE' ? t1 : t2;
      matches.push({
        id: id++,
        sides: [
          { team: t1, score: t1 === 'BYE' ? undefined : 1 },
          { team: t2, score: t2 === 'BYE' ? undefined : 0 },
        ],
      });
      next.push(winner);
      losers.push(loser);
    }
    rounds.push({ name: roundName(current.length), matches });
    if (current.length === 4) {
      semifinalLosers = losers;
    }
    current = next;
  }
  if (semifinalLosers.length === 2) {
    rounds.push({
      name: 'Third Place',
      matches: [
        {
          id: id++,
          sides: [
            { team: semifinalLosers[0], score: 1 },
            { team: semifinalLosers[1], score: 0 },
          ],
        },
      ],
    });
  }
  return rounds;
}

const examples = [32, 24, 16, 12, 8, 4].map((count) => ({
  count,
  rounds: generateBracket(count),
}));

export default function Bracket() {
  return (
    <PageLayout title="Bracket">
      {examples.map((ex) => (
        <div key={ex.count} style={{ marginTop: 32 }}>
          <Text as="h2" size={500} block>
            {ex.count} teams
          </Text>
          <TournamentBracket rounds={ex.rounds} />
        </div>
      ))}
    </PageLayout>
  );
}
