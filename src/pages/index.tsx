//import Image from 'next/image'
import LeaderboardTable from '../components/LeaderBoard/leaderboardTable'
export default function Home() {
  return (
    <main
      className={`z-10 w-full max-w-5xl h-screen text-sm  p-24`}
    >
      <LeaderboardTable/>
    </main>
  )
}
