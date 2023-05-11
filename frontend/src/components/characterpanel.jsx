import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CharacterPanel({ character }) {
  function renderThumbnail(character) {
    if (!character.thumbnail) {
      return null;
    } else {
      return (
        <img
          style={{ backgroundColor: `${character.vision.color}` }}
          src={character.thumbnail}
          className="h-28 overflow-hidden object-cover"
        />
      );
    }
  }

  return (
    <Link
      to={'/characters/' + character._id}
      className="w-28 h-40 flex flex-col justify-stretch overflow-hidden text-white bg-sky-900 rounded-md"
    >
      {renderThumbnail(character)}
      <p className="m-auto h-auto">{character.name}</p>
    </Link>
  );
}

export default CharacterPanel;
