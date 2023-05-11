import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WeaponPanel({ weapon }) {
  return (
    <Link
      to={'/weapons/' + weapon._id}
      className="w-28 h-32 flex text-white bg-sky-900 rounded-xl hover:scale-110 ease-in duration-75"
    >
      <div className="flex-1 flex justify-center items-center">
        <p className="text-center">{weapon.name}</p>
      </div>
    </Link>
  );
}

export default WeaponPanel;
