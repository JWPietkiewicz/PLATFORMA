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
          { id: 'itago-gdynia', team: 'ITAGO GDYNIA', score: 0 },
          { id: 'obroncy-tytulu', team: 'OBROŃCY TYTUŁU', score: 1 },
        ],
      },
      {
        id: 2,
        sides: [
          { id: 'zadymiarze', team: 'ZADYMIARZE', score: 0 },
          { id: 'nieobliczalni', team: 'NIEOBLICZALNI', score: 1 },
        ],
      },
      {
        id: 3,
        sides: [
          { id: 'bbg', team: 'BBG', score: 0 },
          { id: 'czarne-konie', team: 'CZARNE KONIE', score: 1 },
        ],
      },
      {
        id: 4,
        sides: [
          { id: 'skyhawks', team: 'SKYHAWKS', score: 1 },
          { id: 'zabie-kruki', team: 'ŻABIE KRUKI', score: 0 },
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
          { id: 'obroncy-tytulu', team: 'OBROŃCY TYTUŁU', score: 0 },
          { id: 'nieobliczalni', team: 'NIEOBLICZALNI', score: 1 },
        ],
      },
      {
        id: 6,
        sides: [
          { id: 'czarne-konie', team: 'CZARNE KONIE', score: 1 },
          { id: 'skyhawks', team: 'SKYHAWKS', score: 0 },
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
          { id: 'nieobliczalni', team: 'NIEOBLICZALNI', score: 1 },
          { id: 'czarne-konie', team: 'CZARNE KONIE', score: 0 },
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
          { id: 'obroncy-tytulu', team: 'OBROŃCY TYTUŁU', score: 1 },
          { id: 'skyhawks', team: 'SKYHAWKS', score: 0 },
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

