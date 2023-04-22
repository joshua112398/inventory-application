import { useEffect, useState } from 'react';
import VisionPanel from '../components/visionpanel';
import Form from '../components/form';
import { Link } from 'react-router-dom';

function Visions() {
  const [visions, setVisions] = useState([]);
  const [formVisibility, setFormVisibility] = useState(false);

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
      return <VisionPanel key={vision._id} vision={vision} />;
    });
    return converted;
  }

  function toggleForm() {
    setFormVisibility((formVisibility) => {
      return !formVisibility;
    });
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
        {convertVisions(visions)}
      </div>
      <Form group="visions" isVisible={formVisibility} />
    </>
  );
}

export default Visions;
