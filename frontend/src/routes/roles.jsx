import { useEffect, useState } from 'react';
import RolePanel from '../components/rolepanel';
import Form from '../components/form';
import { Link } from 'react-router-dom';

function Roles() {
  const [fetchComplete, setFetchComplete] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formVisibility, setFormVisibility] = useState(false);
  const [lastResponse, setLastResponse] = useState('');

  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedRolesJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/roles`
        );
        const fetchedRoles = await fetchedRolesJson.json();
        setFetchComplete(true);
        setRoles(fetchedRoles);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, [lastResponse]);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertRoles(roles) {
    const converted = roles.map((role) => {
      return <RolePanel key={role._id} role={role} />;
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
        {convertRoles(roles)}
      </div>
      <Form
        group="roles"
        isVisible={formVisibility}
        postLastResponse={postLastResponse}
        toggleForm={toggleForm}
      />
    </>
  );
}

export default Roles;
