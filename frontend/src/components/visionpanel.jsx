import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VisionPanel({ vision }) {
  return (
    <Link
      to={'/visions/' + vision._id}
      className="w-32 h-48 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-xl hover:scale-110 ease-in duration-75"
    >
      <p>{vision.name}</p>
    </Link>
  );
}

export default VisionPanel;
