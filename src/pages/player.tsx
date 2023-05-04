
import { Table } from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useGetMatchesPlayerQuery } from '../redux/api';

let name: string | string[] | undefined = ""

function PlayerTable() {

  const router = useRouter();
  const { gameName, tag } = router.query;

  name = gameName
  const { data, isLoading, error } = useGetMatchesPlayerQuery({ region: 'eu', gamename: gameName, tag})

  function formatSecondsToHours(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

   if (isLoading) {
     return <p className='m-4 p-4'>Loading data...</p>;
   }
 
   if (error) {
     return <p className='m-4 p-4'>{error}</p>;
   }

  function Mapplayed(map: string, players: any) {
    let player = players.find((player: any) => (player.name == name))
    return <div>
      <h4 className='font-bold'>{map}</h4>
      <Image src={player.assets.card.large} alt="card" width={80} height={80} />
    </div>
  }

  function TeamPlayersWin(teams: any, players: any) {
    let player = players.find((player: any) => (player.name == name))
    if (player.team == "Blue") {
      return teams.blue.has_won ? "Blue: Win" : "Blue: Lost"
    }
    else if (player.team == "Red") {
      return teams.red.has_won ? "Red: Win" : "Red: Lost"
    }
  }

  function PlayersKDA(players: any) {
    let player = players.find((player: any) => (player.name == name))
    return `${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}`
  }

  function AgentPlayer(players: any) {
    let player = players.find((player: any) => (player.name == name))

    return <Image src={player.assets.agent.small} alt="agent" width={80} height={80} />
  }


  const rows = data && data.data.map((cell) => (
    <tr key={cell.metadata.matchid}>
      <td>{Mapplayed(cell.metadata.map, cell.players.all_players)}</td>
      <td>{TeamPlayersWin(cell.teams, cell.players.all_players)}</td>
      <td>{PlayersKDA(cell.players.all_players)}</td>
      <td>{AgentPlayer(cell.players.all_players)}</td>
      <td>{cell.metadata.game_start_patched}</td>
      <td>{formatSecondsToHours(cell.metadata.game_length)}</td>
    </tr>
  ));

  return (<>
    {data && (
      <div className='w-full max-w-5xl h-screen text-sm  p-24'>
        <Table fontSize="md">
          <thead>
            <tr>
              <th>Map played</th>
              <th>Team: lost/win</th>
              <th>K/D/A</th>
              <th>Agent</th>
              <th>DateTime</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>)
    }
  </>);
}

export default PlayerTable;