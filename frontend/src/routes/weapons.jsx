import { useEffect, useState } from 'react';
import WeaponPanel from '../components/weaponpanel';
import { Link } from 'react-router-dom';

function Weapons() {
  const [weapons, setWeapons] = useState([]);
  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedWeaponsJson = await fetch(
          'http://localhost:3000/api/weapons'
        );
        const fetchedWeapons = await fetchedWeaponsJson.json();
        setWeapons(fetchedWeapons);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, []);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertWeapons(weapons) {
    const converted = weapons.map((weapon) => {
      return <WeaponPanel key={weapon._id} weapon={weapon} />;
    });
    return converted;
  }

  return (
    <div className="flex flex-wrap gap-5 p-4">{convertWeapons(weapons)}</div>
  );
}

export default Weapons;
