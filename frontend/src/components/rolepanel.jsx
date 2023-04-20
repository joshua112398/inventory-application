import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RolePanel({ role }) {
  return (
    <Link
      to={'/roles/' + role._id}
      className="w-32 h-48 flex flex-col gap-2 text-white bg-sky-900 p-4 rounded-md"
    >
      <p>{role.name}</p>
    </Link>
  );
}

export default RolePanel;
