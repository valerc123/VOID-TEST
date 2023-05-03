import { useRouter } from 'next/router';

function Player() {
  const router = useRouter();
  const { gameName, tagline } = router.query;

  return (
    <div>
      <h1>gameName: {gameName}</h1>
      <h2>tagline: {tagline}</h2>
      {/* Render the content of the page based on the category and slug values */}
    </div>
  );
}

export default Player;