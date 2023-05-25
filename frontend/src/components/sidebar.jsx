import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import characterIcon from '../assets/character-svgrepo-com.svg';

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
        className="bg-sky-900 text-white sm:hidden flex justify-around w-full h-24 p-4"
      >
        <div className="w-full p-4">
          <h1 className="text-3xl font-bold">vision.gg</h1>
        </div>
        <button
          className="hover:scale-110 ease-in p-1 sm:hidden block"
          onClick={toggleMenuVisibility}
        >
          <img
            className="h-16 stroke-white"
            src="../src/assets/menu-svgrepo-com.svg"
          />
        </button>
      </div>

      {/*The menu/sidebar. On small screens, it will be hidden by default and will only
      be shown when the user presses the Menu button. The menu also takes up the entire
      screen on smaller screens instead of being a sidebar.*/}
      <div
        id="sidebar"
        className={
          'flex-shrink-0 bg-sky-900 text-white sm:w-64 sm:fixed sm:overflow-auto sm:h-full ' +
          'sm:block z-10 overflow-auto fixed h-full w-full p-4 ' +
          menuVisibility()
        }
      >
        {/* Button for closing the menu on smaller screens only. Does nothing on bigger screens */}
        <ul id="nav-list" className="flex flex-wrap flex-col gap-4">
          <div className="w-full p-4 flex justify-between">
            <h1 className="text-3xl font-bold">vision.gg</h1>
            <button
              id="close-menu-button"
              className={
                'sm:hidden hover:scale-110 ease-in duration-100 p-1 ' +
                menuVisibility()
              }
              onClick={toggleMenuVisibility}
            >
              <img
                className="h-8 stroke-white"
                src="../src/assets/close-mini-1522-svgrepo-com.svg"
              />
            </button>
          </div>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/"
              className="flex gap-4 items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <div className="h-full">
                <img
                  className="h-full stroke-white"
                  src="../src/assets/home-svgrepo-com.svg"
                />
              </div>
              <p className="text-lg">Home</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/characters"
              className="flex gap-4 items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <div className="h-full">
                <img className="h-full stroke-white" src={characterIcon} />
              </div>
              <p className="text-lg">Characters</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/visions"
              className="flex gap-4 items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <div className="h-full">
                <img
                  className="h-full stroke-white"
                  src="../src/assets/gem-1-svgrepo-com.svg"
                />
              </div>
              <p className="text-lg">Visions</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/weapons"
              className="flex gap-4 items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <div className="h-full">
                <img
                  className="h-full stroke-white"
                  src="../src/assets/sword-svgrepo-com.svg"
                />
              </div>
              <p className="text-lg">Weapons</p>
            </NavLink>
          </li>
          <li className="ease-in duration-100 overflow-hidden rounded-xl hover:bg-sky-950 active:bg-sky-950 h-16 w-full">
            <NavLink
              to="/roles"
              className="flex gap-4 items-center h-full py-3 px-4 [&.active]:bg-sky-950"
              onClick={toggleMenuVisibility}
            >
              <div className="h-full aspect-square flex items-center">
                <img
                  className="h-3/4 stroke-white"
                  src="../src/assets/book-closed-svgrepo-com.svg"
                />
              </div>
              <p className="text-lg">Roles</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
