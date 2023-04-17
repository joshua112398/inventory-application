import { useState } from 'react';
import { Link } from 'react-router-dom';

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
          'bg-sky-900 text-white sm:w-56 sm:h-screen sm:static sm:block fixed w-full h-full p-4 ' +
          menuVisibility()
        }
      >
        {/* Button for closing the menu on smaller screens only. Does nothing on bigger screens */}
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
            <Link to="/">Home</Link>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <Link to="/characters">Characters</Link>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <Link to="/visions">Visions</Link>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <Link to="/weapons">Weapons</Link>
          </li>
          <li className="hover:bg-sky-950 w-full p-4">
            <Link to="/roles">Roles</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;