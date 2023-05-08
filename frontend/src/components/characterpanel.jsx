import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CharacterPanel({ character }) {
  function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return window.btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }

  function renderThumbnail(character) {
    if (!character.thumbnail) {
      return null;
    } else {
      const src = `data:${character.thumbnail.contentType};base64, ${toBase64(
        character.thumbnail.data.data
      )}`;
      return <img src={src} />;
    }
  }

  return (
    <Link
      to={'/characters/' + character._id}
      className="w-32 h-48 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-md"
    >
      {renderThumbnail(character)}
      <p>{character.name}</p>
      <p>{character.vision.name}</p>
    </Link>
  );
}

export default CharacterPanel;
