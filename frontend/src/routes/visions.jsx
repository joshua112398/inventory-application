import { useEffect, useState } from 'react';
import VisionPanel from '../components/weaponpanel';
import { Link } from 'react-router-dom';

function Visions() {
  const [visions, setVisions] = useState([]);
  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedVisionsJson = await fetch(
          'http://localhost:3000/api/visions'
        );
        const fetchedVisions = await fetchedVisionsJson.json();
        setVisions(fetchedVisions);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, []);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertVisions(visions) {
    const converted = visions.map((vision) => {
      return <VisionPanel key={vision._id} weapon={vision} />;
    });
    return converted;
  }

  return (
    <div className="flex flex-wrap gap-5 p-4">{convertVisions(visions)}</div>
  );
}

export default Visions;
