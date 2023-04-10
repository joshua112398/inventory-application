import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="bg-sky-950 text-white sm:w-56 sm:h-screen w-full h-16 p-4"
    >
      <ul id="nav-list" className="flex sm:flex-col flex-row">
        <li className="hover:bg-sky-900 w-full p-4 ">
          <h1>Vision</h1>
        </li>
        <li className="hover:bg-sky-900 w-full p-4">
          <a href="/">Home</a>
        </li>
        <li className="hover:bg-sky-900 w-full p-4">
          <a href="/characters">Characters</a>
        </li>
        <li className="hover:bg-sky-900 w-full p-4">
          <a href="/visions">Visions</a>
        </li>
        <li className="hover:bg-sky-900 w-full p-4">
          <a href="/weapons">Weapons</a>
        </li>
        <li className="hover:bg-sky-900 w-full p-4">
          <a href="/roles">Roles</a>
        </li>
      </ul>
    </div>
  );
}
