import { Box, Button, Group, Text, TextInput } from '@mantine/core';
/* import { useDebouncedValue } from '@mantine/hooks'; */
import { IconSearch } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
//import { useGetPostsIdQuery } from '../redux/posts/api';
import  data from "../components/posts.json"
import { useDebouncedValue } from '@mantine/hooks'

const initialRecords = data.slice(0, 10);

export default function Posts() {
   //const { data, isLoading} = useGetPostsIdQuery("1")
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const batchSize = 10;
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(initialRecords);

  const [query, setQuery] = useState('');
 // const [debouncedQuery] = useDebouncedValue(query, 200);

  const scrollViewportRef = useRef<HTMLDivElement>(null);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const loadMoreRecords = () => {
    if (records.length < posts.length) {
      setLoading(true); 
      timeout = setTimeout(() => {
        setRecords(posts.slice(0, records.length + batchSize));
        setLoading(false);
      }, 1000);
    }
  }; 

  const reset = () => {
    setRecords(posts.slice(0, batchSize));
    scrollViewportRef.current?.scrollTo(0, 0);
  };

  useEffect(() => {
   if (loading === false){
     setPosts(data)
        console.log(posts)

    // setRecords(data.slice(0, batchSize));
   }
  }, [data]);

  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
        initialRecords.filter(({ authorName, postText }) => {
        
        if (
          debouncedQuery !== '' &&
          !`${authorName} ${postText} `
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery]);

  useEffect(() => {
    return () => {
      // Clear timeout on unmount
      if (timeout) clearTimeout(timeout);
    };
  }, [timeout]); 

  return (
    <>
    <div className='m-9'>
        <TextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search employees..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
        />
    </div>

    {/* {isLoading ? <p className='m-4 p-4'>Loading data...</p> : (
    <> */}
    <Box sx={{ height: 300 }}>
      <DataTable
        withBorder
        withColumnBorders
        borderRadius="sm"
        fontSize="md"
        height={400}
        columns={[
          {accessor: 'id', hidden: true},
          // {accessor: 'authorAvatar', title: 'Avatar'},
          {accessor: 'authorName', title: 'Name' },
          // {accessor: 'postImage', title: 'Image'},
          {accessor: 'postText', title: 'Text'},
      ]
        }
        records={records}
        fetching={loading}
        onScrollToBottom={loadMoreRecords}
        scrollViewportRef={scrollViewportRef}
       /*  onRowClick={(post, rowIndex, event) => {
          router.push(`posts/${post.id}`);
        }} */
      />

      <Group mt="sm" mx="xs" position="apart">
        <Text size="sm">
          Showing {records.length} records of {posts.length}
          {records.length < posts.length && ', scroll to bottom to load more'}
        </Text>
        <Button variant="light" onClick={reset}>
          Reset records
        </Button>
      </Group>
      </Box>
      {/* </>)
      } */}
    </>
  );
}