import { useState } from 'react';

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

  const menuVisibility = function () {
    if (showMenu === false) {
      return 'hidden';
    } else {
      return 'block';
    }
  };

  const toggleMenuVisibility = function () {
    setShowMenu((showMenu) => {
      return !showMenu;
    });
  };

  return (
    <>
      <div
        id="top-banner"
        className="bg-sky-900 text-white sm:hidden w-full h-24 p-4"
      >
        <button
          className="hover:bg-sky-950 p-4 border-2 sm:hidden block"
          onClick={toggleMenuVisibility}
        >
          Menu
        </button>
      </div>
      <div
        id="sidebar"
        className={
          'bg-sky-900 text-white sm:w-56 sm:h-screen sm:static sm:block fixed w-full h-full p-4 ' +
          menuVisibility()
        }
      >
        <button
          id="close-menu-button"
          className={'hover:bg-sky-950 p-4 border-2 ' + menuVisibility()}
          onClick={toggleMenuVisibility}
        />
        <ul id="nav-list" className="flex flex-wrap sm:flex-col flex-row gap-2">
          <li className="hover:bg-sky-950 w-full p-4 ">
            <h1>Vision.gg</h1>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <a href="/">Home</a>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <a href="/characters">Characters</a>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <a href="/visions">Visions</a>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <a href="/weapons">Weapons</a>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <a href="/roles">Roles</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
