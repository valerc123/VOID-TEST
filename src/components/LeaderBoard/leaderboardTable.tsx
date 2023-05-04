import { Button, Group, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useRef, useState } from 'react';
import data from './resLeaderboard.json';
import { useRouter } from 'next/router';

export default function LeaderboardTable() {
  let players = data.players;
  const router = useRouter();
  const batchSize = 1000;
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(players.slice(0, batchSize));
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  let key = '';
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const loadMoreRecords = () => {
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
        withColumnBorders
        borderRadius="sm"
        fontSize="md"
        height={900}
        columns={[
          {accessor: 'PlayerCardID', hidden: true},
          {accessor: 'leaderboardRank', title: 'Rank' },
          {accessor: 'gameName', title: 'Name'},
          {accessor: 'tagLine', title: 'Tag' },
          {accessor: 'rankedRating' },
          {accessor: 'numberOfWins', title: 'Wins'},
          {accessor: 'competitiveTier', title: 'Tier'}]
        }
        records={records}
        fetching={loading}
        onScrollToBottom={loadMoreRecords}
        scrollViewportRef={scrollViewportRef}
        onRowClick={(player, rowIndex, event) => {
          router.push(`player/${player.gameName}/${player.tagLine}`);
        }}
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