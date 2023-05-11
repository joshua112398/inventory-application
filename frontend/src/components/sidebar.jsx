import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

  //
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
      {/*On small screens, show a banner at the top with a menu button to open the menu*/}
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

      {/*The menu/sidebar. On small screens, it will be hidden by default and will only
      be shown when the user presses the Menu button. The menu also takes up the entire
      screen on smaller screens instead of being a sidebar.*/}
      <div
        id="sidebar"
        className={
          'flex-shrink-0 bg-sky-900 text-white sm:w-56 sm:fixed sm:overflow-auto sm:h-full ' +
          'sm:block z-10 overflow-auto fixed h-full w-full p-4 ' +
          menuVisibility()
        }
      >
        {/* Button for closing the menu on smaller screens only. Does nothing on bigger screens */}
        <button
          id="close-menu-button"
          className={
            'sm:hidden hover:bg-sky-950 p-4 border-2 ' + menuVisibility()
          }
          onClick={toggleMenuVisibility}
        />
        <ul id="nav-list" className="flex flex-wrap flex-col gap-4">
          <li className="w-full p-4">
            <h1 className="text-3xl">vision.gg</h1>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/"
              className="flex items-center h-full py-3 px-4 [&.active]:bg-sky-950"
            >
              <p className="text-lg">Home</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/characters"
              className="flex items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <p className="text-lg">Characters</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/visions"
              className="flex items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <p className="text-lg">Visions</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/weapons"
              className="flex items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <p className="text-lg">Weapons</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/roles"
              className="flex items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <p className="text-lg">Roles</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
