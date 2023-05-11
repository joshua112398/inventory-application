import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VisionPanel({ vision }) {
  return (
    <Link
      to={'/visions/' + vision._id}
      style={{ borderColor: `${vision.color}` }}
      className="w-96 h-24 border-l-4 flex items-center text-white bg-sky-900 py-4 px-8 rounded-xl hover:scale-105 ease-in duration-75"
    >
      <p className="text-2xl">{vision.name}</p>
    </Link>
  );
}

export default VisionPanel;
