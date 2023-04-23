import { useState } from 'react';
import { Link } from 'react-router-dom';

function Form({ group, isVisible, toggleForm, postLastResponse }) {
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

  /* Visibility is controlled by the isVisible prop passed to it, which can be controlled
  by the parent component */
  if (isVisible === false) {
    return null;
  } else if (group === 'visions') {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-scroll">
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
              <input id="name" name="name" className="text-black" />
            </div>
            <div className="flex gap-4">
              <label htmlFor="color" className="block">
                Color:
              </label>
              <input id="color" type="color" name="color" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
