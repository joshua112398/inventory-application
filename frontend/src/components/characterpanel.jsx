import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CharacterPanel({ character }) {
  return (
    <Link
      to={'/characters/' + character._id}
      className="w-32 h-48 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-md"
    >
      <p>{character.name}</p>
      <p>{character.vision.name}</p>
    </Link>
  );
}

export default CharacterPanel;
