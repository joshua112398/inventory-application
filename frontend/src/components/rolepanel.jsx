import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RolePanel({ role }) {
  return (
    <Link
      to={'/roles/' + role._id}
      className="w-96 h-24 flex items-center text-white bg-sky-900 py-4 px-8 rounded-xl hover:scale-105 ease-in duration-75"
    >
      <p className="text-2xl">{role.name}</p>
    </Link>
  );
}

export default RolePanel;
