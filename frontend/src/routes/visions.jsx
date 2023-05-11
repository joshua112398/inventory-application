import { useEffect, useState } from 'react';
import VisionPanel from '../components/visionpanel';
import Form from '../components/form';
import { Link } from 'react-router-dom';

function Visions() {
  const [fetchComplete, setFetchComplete] = useState(false);
  const [visions, setVisions] = useState([]);
  const [formVisibility, setFormVisibility] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    console.log('Rendering');
    async function startFetching() {
      try {
        const fetchedVisionsJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/visions`
        );
        const fetchedVisions = await fetchedVisionsJson.json();
        setFetchComplete(true);
        setVisions(fetchedVisions);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, [lastResponse]);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertVisions(visions) {
    const converted = visions.map((vision) => {
      return <VisionPanel key={vision._id} vision={vision} />;
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
          className="w-32 h-48 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-xl hover:scale-110 ease-in duration-75"
          onClick={toggleForm}
        >
          +
        </button>
        {convertVisions(visions)}
      </div>
      <Form
        group="visions"
        isVisible={formVisibility}
        postLastResponse={postLastResponse}
        toggleForm={toggleForm}
      />
    </>
  );
}

export default Visions;
