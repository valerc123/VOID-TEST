import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite'

export default function Leaderboard() {
    /* const [data, setData] = useState(null); */

   /*  useEffect(() => { */
      async function GetLeaderBoard() {
        const response = await fetch('https://api.henrikdev.xyz/valorant/v2/leaderboard/latam');
        const json = await response.json();
        /* setData(json); */
      }
   /*    GetLeaderBoard();
    }, []);  */


    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached end
        return `/valorant/v2/leaderboard/latam?startIndex=${pageIndex * 10}`
    }

    const { data, error, size, setSize } = useSWRInfinite(getKey, GetLeaderBoard)

  const leaderboardData = data ? data.players.flat() : []

  const handleLoadMore = () => {
    setSize(size + 1)
  }

  return (
    <div>
        
      
    {data && (
      <ul>
        {data.total_players}
        {data.map(item => (
          <li key={item.puuid}>
            <p>{item.name}</p>
            <p>{item.rank}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}
