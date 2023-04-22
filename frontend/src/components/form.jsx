import { useState } from 'react';
import { Link } from 'react-router-dom';

function Form({ group, isVisible }) {
  /* Visibility is controlled by the isVisible prop passed to it, which can be controlled
  by the parent component */
  if (isVisible === false) {
    return null;
  } else if (group === 'visions') {
    return (
      <div className="absolute left-0 top-0 w-full h-full bg-black/70 flex justify-center items-center">
        <div className="relative w-4/5 max-w-lg bg-sky-900 text-white p-8 rounded-md">
          <button className="absolute right-4 top-2">X</button>
          <form className="flex flex-col gap-4">
            <label>
              Name:
              <input name="name" />
            </label>
            <label>
              Color:
              <input type="color" name="color" />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
