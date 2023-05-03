import { Button, Group, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useRef, useState } from 'react';
import data from './resLeaderboard.json';

export default function LeaderboardTable() {
  let players = data.players;
  const batchSize = 100;
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(players.slice(0, batchSize));
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  let timeout: ReturnType<typeof setTimeout> | undefined;
  for (let i = 0; i < records.length; i++) {
    console.log(records[i]);
  }

  const loadMoreRecords = () => {
    // iterate through the records and print each one
     


    if (records.length < players.length) {
      setLoading(true);
      timeout = setTimeout(() => {
        setRecords(players.slice(0, records.length + batchSize));
        setLoading(false);
      }, 1000);
    }
  };

  const reset = () => {
    setRecords(players.slice(0, batchSize));
    // Make sure to scroll to top after resetting records
    scrollViewportRef.current?.scrollTo(0, 0);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <>
      <DataTable
        withBorder
        borderRadius="sm"
        height={800}
        columns={[{ accessor: 'leaderboardRank' }, { accessor: 'gameName' }, {accessor: 'tagLine'}, { accessor: 'rankedRating' } , {accessor: 'numberOfWins'}, {accessor: 'competitiveTier'}]}
        records={records}
        fetching={loading}
        onScrollToBottom={loadMoreRecords}
        scrollViewportRef={scrollViewportRef}
      />
      <Group mt="sm" mx="xs" position="apart">
        <Text size="sm">
          Showing {records.length} records of {players.length}
          {records.length < players.length && ', scroll to bottom to load more'}
        </Text>
        <Button variant="light" onClick={reset}>
          Reset records
        </Button>
      </Group>
    </>
  );
}