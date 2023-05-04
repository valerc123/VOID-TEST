import {Container, Text } from '@mantine/core';
import Link from 'next/link';

function Header() {
  return (
  <Container size="lg">
    <div className="ml-auto inline-flex">
      <div className='m-3'>
        <Link href="/">
          <Text  variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              ta="center"
              fz="xl"
              fw={700}>
            Leaderboard
        </Text>
        </Link>
      </div>
      <div className='m-3'>
        <Link href="/posts">
            <Text  variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              ta="center"
              fz="xl"
              fw={700}>
            Posts
            </Text>
        </Link>
      </div>
    </div>
  </Container>
  );
}

export default Header;