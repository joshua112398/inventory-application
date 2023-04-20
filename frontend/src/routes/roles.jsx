import { useEffect, useState } from 'react';
import RolePanel from '../components/rolepanel';
import { Link } from 'react-router-dom';

function Roles() {
  const [roles, setRoles] = useState([]);
  // Only runs when component mounts
  useEffect(() => {
    // Fetch characters from database through a Rest API backend
    async function startFetching() {
      try {
        const fetchedRolesJson = await fetch('http://localhost:3000/api/roles');
        const fetchedRoles = await fetchedRolesJson.json();
        setRoles(fetchedRoles);
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, []);

  /* Helper function to convert array of characters to panels that can be
  rendered by React */
  function convertRoles(roles) {
    const converted = roles.map((role) => {
      return <RolePanel key={role._id} role={role} />;
    });
    return converted;
  }

  return <div className="flex flex-wrap gap-5 p-4">{convertRoles(roles)}</div>;
}

export default Roles;
