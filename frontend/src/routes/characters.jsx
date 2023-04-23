import { useEffect, useState } from 'react';
import CharacterPanel from '../components/characterpanel';
import { Link } from 'react-router-dom';

function Characters() {
  const [characters, setCharacters] = useState([]);
  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedCharactersJson = await fetch(
          'http://localhost:3000/api/characters'
        );
        const fetchedCharacters = await fetchedCharactersJson.json();
        setCharacters(fetchedCharacters);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, []);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertCharacters(characters) {
    const converted = characters.map((character) => {
      return <CharacterPanel key={character._id} character={character} />;
    });
    return converted;
  }

  return (
    <div className="flex flex-wrap gap-5 p-4">
      {convertCharacters(characters)}
      {convertCharacters(characters)}
      {convertCharacters(characters)}
      {convertCharacters(characters)}
      {convertCharacters(characters)}
    </div>
  );
}

export default Characters;
