
import { Table} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

//import { DataTable } from 'mantine-datatable';


function useFetchData() {
  const router = useRouter(); 
  const { gameName, tagline } = router.query;
  const URL = `https://api.henrikdev.xyz/valorant/v3/matches/eu/${gameName?gameName:""}/${tagline?tagline:""}`
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data)
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setIsLoading(false);
        console.error(error)
      });
  }, [URL]);

  return { data, isLoading, error };
}

function PlayerTable() {
  const { data, isLoading, error } = useFetchData();
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
        
  const rows = data.data && data.data.map((cell) => (
    <tr key={cell.metadata.matchid}>
      <td>{cell.metadata.map}</td>
      <td>{formatSecondsToHours(cell.metadata.game_length)}</td>
    
      {/* <td>
        
        <Image src="https://media.valorant-api.com/playercards/b06a92e4-48ab-81f5-244b-9987534a8603/smallart.png" alt="img" width={100} height={100} />
      </td> */}
    </tr>
  ));

  return (
    <div className='w-full max-w-5xl h-screen text-sm  p-24'>
    <Table fontSize="md">
      <thead>
        <tr>
          <th>Map played</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </div>
  );
}




export default PlayerTable;