import { useState } from 'react';
import { Link } from 'react-router-dom';

function Form({ group, isVisible, toggleForm, postLastResponse }) {
  const [characterData, setCharacterData] = useState({
    name: '',
    title: '',
    vision: '',
    weapon: '',
    role: [],
    rating: 0,
    amount: 1,
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

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const objectFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(objectFormData);
    const url = form.action;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formDataJson,
    });

    postLastResponse(response);
    toggleForm();
  }

  function visionForm() {
    return (
      <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
        <button onClick={toggleForm} className="absolute right-4 top-2">
          X
        </button>
        <form
          method="post"
          action="http://localhost:3000/api/visions"
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
                setVisionData({ ...visionData, name: e.target.value });
              }}
              id="name"
              name="name"
              className="text-black"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="color" className="block">
              Color:
            </label>
            <input
              value={visionData.color}
              onChange={(e) => {
                setVisionData({ ...visionData, color: e.target.value });
              }}
              id="color"
              type="color"
              name="color"
            />
          </div>
          <button type="submit">Submit</button>
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
          action="http://localhost:3000/api/weapons"
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
                setWeaponData({ ...weaponData, name: e.target.value });
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
            <input
              value={weaponData.description}
              onChange={(e) => {
                setWeaponData({ ...weaponData, description: e.target.value });
              }}
              id="description"
              name="description"
              className="text-black"
            />
          </div>
          <button type="submit">Submit</button>
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
          action="http://localhost:3000/api/roles"
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
                setRoleData({ ...roleData, name: e.target.value });
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
            <input
              value={roleData.description}
              onChange={(e) => {
                setRoleData({ ...roleData, description: e.target.value });
              }}
              id="description"
              name="description"
              className="text-black"
            />
          </div>
          <button type="submit">Submit</button>
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
