import { useEffect, useState } from 'react';
import WeaponPanel from '../components/weaponpanel';
import Form from '../components/form';
import { Link } from 'react-router-dom';

function Weapons() {
  const [fetchComplete, setFetchComplete] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [formVisibility, setFormVisibility] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedWeaponsJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/weapons`
        );
        const fetchedWeapons = await fetchedWeaponsJson.json();
        setFetchComplete(true);
        setWeapons(fetchedWeapons);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, [lastResponse]);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertWeapons(weapons) {
    const converted = weapons.map((weapon) => {
      return <WeaponPanel key={weapon._id} weapon={weapon} />;
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
          className="w-32 h-48 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-md"
          onClick={toggleForm}
        >
          +
        </button>
        {convertWeapons(weapons)}
      </div>
      <Form
        group="weapons"
        isVisible={formVisibility}
        postLastResponse={postLastResponse}
        toggleForm={toggleForm}
      />
    </>
  );
}

export default Weapons;
