import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Characters() {
  const [characters, setCharacters] = useState([]);
  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database
    async function startFetching() {
      try {
        const fetchedCharactersJson = await fetch(
          'http://localhost:3000/api/characters'
        );
        const fetchedCharacters = await fetchedCharactersJson.json();
        const mappedCharacters = fetchedCharacters.map((character) => (
          <p key={character._id}>{character.name}</p>
        ));
        setCharacters(mappedCharacters);
        console.log(fetchedCharacters);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, []);
  return <div>{characters}</div>;
}

export default Characters;
