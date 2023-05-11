import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';

export default function Root() {
  return (
    <div className="min-h-full flex flex-col sm:flex-row items-stretch relative">
      <Sidebar />
      <div id="detail" className="bg-sky-950 flex-auto relative sm:ml-56 p-4">
        <Outlet />
      </div>
    </div>
  );
}
