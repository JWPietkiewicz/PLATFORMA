import { Stack, Image } from '@fluentui/react';
import { Text } from '@fluentui/react-components';

export default function GameCard({ game }) {
  const dateObj = game.date?.toDate ? game.date.toDate() : new Date(game.date);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Stack
      tokens={{ childrenGap: 4 }}
      styles={{ root: { border: '1px solid var(--colorNeutralStroke1)', padding: 8, minWidth: 160 } }}
    >
      <Text align="center" size={200}>{date} {time}</Text>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 4 }} horizontalAlign="center">
        {game.teamA?.logo && (
          <Image src={game.teamA.logo} width={24} height={24} alt={game.teamA.name} />
        )}
        <Text>{game.teamA?.name}</Text>
        <Text weight="semibold">{game.teamA?.score}</Text>
      </Stack>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 4 }} horizontalAlign="center">
        {game.teamB?.logo && (
          <Image src={game.teamB.logo} width={24} height={24} alt={game.teamB.name} />
        )}
        <Text>{game.teamB?.name}</Text>
        <Text weight="semibold">{game.teamB?.score}</Text>
      </Stack>
      <Text align="center" size={200}>{game.venue}</Text>
    </Stack>
  );
}

