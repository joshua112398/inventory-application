import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Form({
  group,
  isVisible,
  toggleForm,
  postLastResponse,
  existingData,
}) {
  const [characterData, setCharacterData] = useState({
    name: '',
    title: '',
    vision: '',
    weapon: '',
    role: [],
    rating: 0,
    amount: 1,
    thumbnail: null,
    img: null,
  });
  const [visionData, setVisionData] = useState({
    name: '',
    color: '#000000',
  });
  const [roleData, setRoleData] = useState({
    name: '',
    description: '',
  });
  const [weaponData, setWeaponData] = useState({
    name: '',
    description: '',
  });
  const [postErrors, setPostErrors] = useState([]);
  const [visions, setVisions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    // Fetch current list of weapons, roles, and visions to populate the character creation
    // form with them
    // Also set state to existing data passed to form (used for updating existing items)
    async function startFetching() {
      try {
        const fetchedWeaponsJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/weapons`
        );
        const fetchedRolesJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/roles`
        );
        const fetchedVisionsJson = await fetch(
          `${import.meta.env.VITE_API_URL}/api/visions`
        );
        const fetchedWeapons = await fetchedWeaponsJson.json();
        const fetchedRoles = await fetchedRolesJson.json();
        const fetchedVisions = await fetchedVisionsJson.json();
        setRoles(fetchedRoles);
        setWeapons(fetchedWeapons);
        setVisions(fetchedVisions);
        if (existingData != '') {
          if (group === 'weapons') {
            setWeaponData(existingData);
          } else if (group === 'roles') {
            setRoleData(existingData);
          } else if (group === 'visions') {
            setVisionData(existingData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    startFetching();
  }, [group, existingData]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      let url = form.action;
      console.log(form);

      // PUT if existing data, POST if new data, add id to url if PUT
      let method;
      if (existingData === '') {
        method = 'POST';
      } else {
        method = 'PUT';
        url = url + `/${existingData._id}`;
      }

      // Perform fetch PUT or POST
      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      const responseConverted = await response.json();

      // If POST was successful without errors, hide the form. Else, save the errors so it can
      // be displayed on the form to let the user know what to fix.
      if (response.ok === true) {
        toggleForm();
        setPostErrors([]);
        postLastResponse(responseConverted);
      } else {
        setPostErrors(responseConverted.errors);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function showPostErrors() {
    if (postErrors.length) {
      let key = 0;
      return postErrors.map((error) => {
        key += 1;
        return <p key={key}>{error.msg}</p>;
      });
    } else {
      return null;
    }
  }

  function characterForm() {
    // Map the fetched items into <option> elements to be displayed in a <select> form
    const weaponComponents = weapons.map((weapon) => {
      return (
        <option key={weapon._id} value={weapon._id}>
          {weapon.name}
        </option>
      );
    });
    const roleComponents = roles.map((role) => {
      return (
        <option key={role._id} value={role._id}>
          {role.name}
        </option>
      );
    });
    const visionComponents = visions.map((vision) => {
      return (
        <option key={vision._id} value={vision._id}>
          {vision.name}
        </option>
      );
    });

    return (
      <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
        <button onClick={toggleForm} className="absolute right-4 top-2">
          X
        </button>
        <form
          method="post"
          action={`${import.meta.env.VITE_API_URL}/api/characters`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              value={characterData.name}
              onChange={(e) => {
                setCharacterData((characterData) => {
                  return { ...characterData, name: e.target.value };
                });
              }}
              id="name"
              name="name"
              className="text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="block">
              Title:
            </label>
            <input
              value={characterData.title}
              onChange={(e) => {
                setCharacterData((characterData) => {
                  return { ...characterData, title: e.target.value };
                });
              }}
              id="title"
              name="title"
              className="text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="vision" className="block">
              Vision:
            </label>
            <select
              className="text-black"
              id="vision"
              name="vision"
              value={characterData.vision}
              onChange={(e) => {
                setCharacterData({
                  ...characterData,
                  vision: e.target.value,
                });
              }}
            >
              {visionComponents}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="weapon" className="block">
              Weapon:
            </label>
            <select
              className="text-black"
              id="weapon"
              name="weapon"
              value={characterData.weapon}
              onChange={(e) => {
                setCharacterData({
                  ...characterData,
                  weapon: e.target.value,
                });
              }}
            >
              {weaponComponents}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="block">
              Role:
            </label>
            <select
              className="text-black"
              id="role"
              name="role"
              onChange={(e) => {
                setCharacterData({
                  ...characterData,
                  role: e.target.value,
                });
              }}
            >
              {roleComponents}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rating" className="block">
              Rating: <span>{characterData.rating}</span>
            </label>
            <input
              type="range"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={characterData.rating}
              onChange={(e) => {
                setCharacterData((characterData) => {
                  return { ...characterData, rating: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="amount" className="block">
              Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="1"
              max="7"
              step="1"
              className="text-black text-center"
              value={characterData.amount}
              onChange={(e) => {
                setCharacterData((characterData) => {
                  return { ...characterData, amount: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="thumbnail" className="block">
              Thumbnail:
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="text-white text-center"
              onChange={(e) => {
                setCharacterData((characterData) => {
                  return { ...characterData, thumbnail: e.target.files[0] };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="img" className="block">
              Image:
            </label>
            <input
              type="file"
              id="img"
              name="img"
              className="text-white text-center"
              onChange={(e) => {
                setCharacterData((characterData) => {
                  return { ...characterData, img: e.target.files[0] };
                });
              }}
            />
          </div>
          <button type="submit">Submit</button>
          {showPostErrors()}
        </form>
      </div>
    );
  }

  function visionForm() {
    return (
      <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
        <button onClick={toggleForm} className="absolute right-4 top-2">
          X
        </button>
        <form
          method="post"
          action={`${import.meta.env.VITE_API_URL}/api/visions`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              value={visionData.name}
              onChange={(e) => {
                setVisionData((visionData) => {
                  return { ...visionData, name: e.target.value };
                });
              }}
              id="name"
              name="name"
              className="text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="color" className="block">
              Color:
            </label>
            <input
              value={visionData.color}
              onChange={(e) => {
                setVisionData((visionData) => {
                  return { ...visionData, color: e.target.value };
                });
              }}
              id="color"
              type="color"
              name="color"
            />
          </div>
          <button type="submit">Submit</button>
          {showPostErrors()}
        </form>
      </div>
    );
  }

  function weaponForm() {
    return (
      <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
        <button onClick={toggleForm} className="absolute right-4 top-2">
          X
        </button>
        <form
          method="post"
          action={`${import.meta.env.VITE_API_URL}/api/weapons`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              value={weaponData.name}
              onChange={(e) => {
                setWeaponData((weaponData) => {
                  return { ...weaponData, name: e.target.value };
                });
              }}
              id="name"
              name="name"
              className="text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="block">
              Description:
            </label>
            <textarea
              value={weaponData.description}
              onChange={(e) => {
                setWeaponData((weaponData) => {
                  return { ...weaponData, description: e.target.value };
                });
              }}
              id="description"
              name="description"
              className="text-black"
              rows="6"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
          {showPostErrors()}
        </form>
      </div>
    );
  }

  function roleForm() {
    return (
      <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
        <button onClick={toggleForm} className="absolute right-4 top-2">
          X
        </button>
        <form
          method="post"
          action={`${import.meta.env.VITE_API_URL}/api/roles`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              value={roleData.name}
              onChange={(e) => {
                setRoleData((roleData) => {
                  return { ...roleData, name: e.target.value };
                });
              }}
              id="name"
              name="name"
              className="text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="block">
              Description:
            </label>
            <textarea
              value={roleData.description}
              onChange={(e) => {
                setRoleData((roleData) => {
                  return { ...roleData, description: e.target.value };
                });
              }}
              id="description"
              name="description"
              className="text-black"
              rows="6"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
          {showPostErrors()}
        </form>
      </div>
    );
  }

  /* Visibility is controlled by the isVisible prop passed to it, which can be controlled
  by the parent component */
  if (isVisible === false) {
    return null;
  } else if (group === 'characters') {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        {characterForm()}
      </div>
    );
  } else if (group === 'visions') {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        {visionForm()}
      </div>
    );
  } else if (group === 'weapons') {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        {weaponForm()}
      </div>
    );
  } else if (group === 'roles') {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        {roleForm()}
      </div>
    );
  }
}

export default Form;
