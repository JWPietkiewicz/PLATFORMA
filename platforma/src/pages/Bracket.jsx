import { FluentProvider, Text, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import TournamentBracket from '../components/bracket/TournamentBracket';

const lightExample = {
  rounds: [
    {
      name: 'Semifinals',
      matches: [
        { id: 1, sides: [{ team: 'Lions', score: 80 }, { team: 'Tigers', score: 75 }] },
        { id: 2, sides: [{ team: 'Bears', score: 68 }, { team: 'Hawks', score: 70 }] },
      ],
    },
    {
      name: 'Final',
      matches: [
        { id: 3, sides: [{ team: 'Lions', score: 88 }, { team: 'Hawks', score: 90 }] },
      ],
    },
  ],
};

const darkExample = {
  rounds: [
    {
      name: 'Quarterfinals',
      matches: [
        { id: 1, sides: [{ team: 'Alpha', score: 1 }, { team: 'Bravo', score: 0 }] },
        { id: 2, sides: [{ team: 'Charlie', score: 1 }, { team: 'Delta', score: 0 }] },
        { id: 3, sides: [{ team: 'Echo', score: 1 }, { team: 'Foxtrot', score: 0 }] },
        { id: 4, sides: [{ team: 'Golf', score: 1 }, { team: 'Hotel', score: 0 }] },
      ],
    },
    {
      name: 'Semifinals',
      matches: [
        { id: 5, sides: [{ team: 'Alpha', score: 1 }, { team: 'Charlie', score: 0 }] },
        { id: 6, sides: [{ team: 'Echo', score: 1 }, { team: 'Golf', score: 0 }] },
      ],
    },
    {
      name: 'Final',
      matches: [
        { id: 7, sides: [{ team: 'Alpha', score: 1 }, { team: 'Echo', score: 0 }] },
      ],
    },
  ],
};

export default function Bracket() {
  return (
    <div style={{ padding: 16 }}>
      <Text as="h1" size={800} block>
        Bracket
      </Text>

      <Text as="h2" size={500} block>
        Light theme
      </Text>
      <FluentProvider theme={webLightTheme} style={{ padding: 16 }}>
        <TournamentBracket rounds={lightExample.rounds} />
      </FluentProvider>

      <Text as="h2" size={500} block style={{ marginTop: 32 }}>
        Dark theme
      </Text>
      <FluentProvider theme={webDarkTheme} style={{ padding: 16 }}>
        <TournamentBracket rounds={darkExample.rounds} />
      </FluentProvider>
    </div>
  );
}

