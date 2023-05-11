import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DeletePopup({ visible, toggleVisibility, group, name, id }) {
  const [conflictingCharacters, setConflictingCharacters] = useState([]);
  const type = group.slice(0, group.length - 1);

  useEffect(() => {
    // Fetch all characters with the to-be-deleted vision or role assigned to them

    async function startFetching() {
      if (group !== 'characters') {
        const fetchedCharactersJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/characters/?${type}=${id}`
        );
        const fetchedCharacters = await fetchedCharactersJson.json();
        setConflictingCharacters(fetchedCharacters);
        return;
      } else {
        return;
      }
    }

    startFetching();
  }, []);

  function displayConflictingCharacters() {
    return conflictingCharacters.map((character) => {
      return (
        <li key={character._id}>
          <Link onClick={toggleVisibility} to={`/characters/${character._id}`}>
            {character.name}
          </Link>
        </li>
      );
    });
  }

  async function deleteItem() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${group}/${id}`,
        {
          method: 'DELETE',
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  function renderDeletePopup(type) {
    // If deleting a character, no need to check for conflicting items, just confirm deletion.
    // Or if no characters are found that have the item to-be-deleted assigned to them
    if (type === 'character' || conflictingCharacters.length === 0) {
      return (
        <>
          <p>Are you sure you want to delete? </p>
          <Link
            to={'/' + group}
            onClick={deleteItem}
            className="text-rose-600 p-4"
          >
            Delete
          </Link>
        </>
      );
      // Else, we need to provide the user a list of characters that are assigned the item
      // to be deleted
    } else {
      return (
        <>
          <p>
            The following characters currently have {name} assigned as their{' '}
            {type}. Please update or delete them first.
          </p>
          {displayConflictingCharacters()}
          <button className="text-rose-600 p-4">Delete</button>
        </>
      );
    }
  }

  if (visible === true) {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
          <button onClick={toggleVisibility} className="absolute right-4 top-2">
            X
          </button>
          {renderDeletePopup(type)}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default DeletePopup;
