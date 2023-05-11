import { useEffect, useState } from 'react';
import CharacterPanel from '../components/characterpanel';
import Form from '../components/form';
import { Link } from 'react-router-dom';

function Characters() {
  const [fetchComplete, setFetchComplete] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [formVisibility, setFormVisibility] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedCharactersJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/characters`
        );
        const fetchedCharacters = await fetchedCharactersJson.json();
        setFetchComplete(true);
        setCharacters(fetchedCharacters);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, [lastResponse]);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertCharacters(characters) {
    const converted = characters.map((character) => {
      return <CharacterPanel key={character._id} character={character} />;
    });
    return converted;
  }

  // State handler to get last response from Form component
  function postLastResponse(response) {
    setLastResponse(response);
  }

  function toggleForm() {
    setFormVisibility((formVisibility) => {
      return !formVisibility;
    });
  }

  if (fetchComplete === false) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-5 p-4">
        <button
          className="w-28 h-40 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-xl hover:scale-110 ease-in duration-75"
          onClick={toggleForm}
        >
          +
        </button>
        {convertCharacters(characters)}
      </div>
      <Form
        group="characters"
        isVisible={formVisibility}
        postLastResponse={postLastResponse}
        toggleForm={toggleForm}
      />
    </>
  );
}

export default Characters;
