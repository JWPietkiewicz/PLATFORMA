import { Text } from '@fluentui/react-components';
import PageLayout from '../components/PageLayout';
import TournamentBracket from '../components/bracket/TournamentBracket';

const rounds = [
  {
    name: 'Round of 8',
    matches: [
      {
        id: 1,
        sides: [
          { team: 'ITAGO GDYNIA', score: 0 },
          { team: 'OBROŃCY TYTUŁU', score: 1 },
        ],
      },
      {
        id: 2,
        sides: [
          { team: 'ZADYMIARZE', score: 0 },
          { team: 'NIEOBLICZALNI', score: 1 },
        ],
      },
      {
        id: 3,
        sides: [
          { team: 'BBG', score: 0 },
          { team: 'CZARNE KONIE', score: 1 },
        ],
      },
      {
        id: 4,
        sides: [
          { team: 'SKYHAWKS', score: 1 },
          { team: 'ŻABIE KRUKI', score: 0 },
        ],
      },
    ],
  },
  {
    name: 'Semifinals',
    matches: [
      {
        id: 5,
        sides: [
          { team: 'OBROŃCY TYTUŁU', score: 0 },
          { team: 'NIEOBLICZALNI', score: 1 },
        ],
      },
      {
        id: 6,
        sides: [
          { team: 'CZARNE KONIE', score: 1 },
          { team: 'SKYHAWKS', score: 0 },
        ],
      },
    ],
  },
  {
    name: 'Finals',
    matches: [
      {
        id: 7,
        sides: [
          { team: 'NIEOBLICZALNI', score: 1 },
          { team: 'CZARNE KONIE', score: 0 },
        ],
      },
    ],
  },
  {
    name: 'Third Place',
    matches: [
      {
        id: 8,
        sides: [
          { team: 'OBROŃCY TYTUŁU', score: 1 },
          { team: 'SKYHAWKS', score: 0 },
        ],
      },
    ],
  },
];

export default function Bracket() {
  return (
    <PageLayout title="Bracket">
      <Text as="h2" size={500} block>
        Round of 8
      </Text>
      <TournamentBracket rounds={rounds} />
    </PageLayout>
  );
}

